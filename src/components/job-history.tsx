import { Card, Container, Nav, Tab, Tabs } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { ArrowRight } from 'react-bootstrap-icons';
interface JobDetails {
    id: string,
    order: number,
    work_detail_text: string,
}

interface Job {
    id: string,
    current_employer: boolean,
    from_date: string,
    to_date: Date,
    job_title: string,
    employer_name: string,
    order: number,
    details: JobDetails[],
}

export const JobHistory = () => {
    const [key, setKey] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[] | null>(null)

    useEffect(() => {
        const fetchJobsWithDetails = async () => {
            try {
                //opting for await here over promise chaining to control execution more since
                //we dont want to set the state var until we have gathered everything.
                const response = await axiosBaseURL.get(`work/history/?applicant=${applicant}`);
                const tmp: Job[] = response.data;
                const detailedJobs = await Promise.all(
                    tmp.map(async (job) => {
                        try {
                            const detailsRes = await axiosBaseURL.get(`/work/history_details/?work_id=${job.id}`);
                            return {
                                ...job,
                                details: detailsRes.data,
                            };
                        } catch (error) {
                            console.error(`Error fetching details for job ${job.id}`);
                            return job;
                        }
                    })
                );
                setJobs(detailedJobs);
                setKey(detailedJobs[0].employer_name)
            } catch (error) {
                console.error('Error fetching work history:', error);
            }
        };
        fetchJobsWithDetails()
    }, []);

    return (
        <Container>
            <Nav fill variant="tabs" activeKey={key ? key : 'Loading..'}>
                {jobs ?
                    <>
                        {jobs.map(function (job: Job) {
                            return (
                                <Nav.Item key={job.id}>
                                    <Nav.Link eventKey={job.employer_name} onClick={() => setKey(job.employer_name)}>{job.employer_name} <span style={{ marginLeft: '2rem' }}><ArrowRight /></span></Nav.Link>
                                </Nav.Item>
                            )
                        })}
                    </>
                    : <CenteredSpinner />
                }
            </Nav>
            {key &&
                <p>content component here</p>
            }
        </Container>
    );
}
