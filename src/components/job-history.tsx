import { Card, Carousel, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
interface JobDetails {
    id:string,
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
            } catch (error) {
                console.error('Error fetching work history:', error);
            }
        };
        fetchJobsWithDetails()
    }, []);

    return (
        <Card style={{ marginBottom: '1rem' }}>
            {jobs ?
                <Carousel interval={null} variant="dark" style={{ minHeight: '200px' }}>
                    {jobs.map(function (job: Job) {
                        return (
                            <Carousel.Item key={job.id} style={{marginBottom:'3rem'}}>
                                <Container style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', }}>
                                    <h5>{`${job.employer_name} - ${job.job_title}`}</h5> 
                                    {job.details.map(function (details: JobDetails) {
                                        return (
                                            <li key={details.id}>{details.work_detail_text}</li>
                                        )
                                    })}
                                </Container>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
                :
                <CenteredSpinner />
            }
        </Card>
    );
}
