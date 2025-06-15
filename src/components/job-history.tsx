import { Container, Fade, Row, Col } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
interface JobDetails {
    id: string,
    order: number,
    work_detail_text: string,
}

interface Job {
    id: string,
    position: number,
    current_employer: boolean,
    from_date: string,
    to_date: Date,
    job_title: string,
    employer_name: string,
    order: number,
    details: JobDetails[],
}

export const JobHistory = () => {
    const jobs = useRef<Job[] | null>(null)
    const idx = useRef<number>(-1)
    const [selectedJob, setSelectedJob] = useState<Job | null>(null)

    useEffect(() => {
        const fetchJobsWithDetails = async () => {
            try {
                //opting for await here over promise chaining to control execution more since
                //we dont want to set the state var until we have gathered everything.
                const response = await axiosBaseURL.get(`work/history/?applicant=${applicant}`);
                const tmp: Job[] = response.data;
                const detailedJobs = await Promise.all(
                    tmp.map(async (job, index) => {
                        try {
                            const detailsRes = await axiosBaseURL.get(`/work/history_details/?work_id=${job.id}`);
                            return {
                                ...job,
                                position: index,
                                details: detailsRes.data,
                            };
                        } catch (error) {
                            console.error(`Error fetching details for job ${job.id}`);
                            return job;
                        }
                    })
                );
                jobs.current = detailedJobs;
                idx.current = 0
                setSelectedJob(jobs.current[idx.current]);

            } catch (error) {
                console.error('Error fetching work history:', error);
            }
        };
        fetchJobsWithDetails()
    }, []);

    const updateIndex = (direction: 'up' | 'down') => {
        let tmpIdx;
        const arryLength = jobs.current?.length ? jobs.current.length : 0
        switch (direction) {
            case 'up':
                tmpIdx = idx.current + 1
                if (arryLength <= tmpIdx) {
                    return;
                }
                idx.current += 1
                setSelectedJob(jobs?.current ? jobs.current[idx.current] : null)
                break;
            case 'down':
                tmpIdx = idx.current - 1
                if (tmpIdx <= -1) {
                    return;
                }
                idx.current -= 1
                setSelectedJob(jobs?.current ? jobs.current[idx.current] : null)
                break;
            default:
                break;
        }
    }

    return (
        <Container>
            {selectedJob ?
                <>
                    <Row className="border-bottom justify-content-around" style={{ width: '100%' }}>
                        <Col className="text-start">
                            <ArrowLeft color="royalblue" type='button' onClick={() => updateIndex('down')} size={35} />
                        </Col>
                        <Col className="text-center" style={{ alignSelf: 'center' }}>
                            <h5>{selectedJob.employer_name}</h5>
                        </Col>
                        <Col className="text-end">
                            <ArrowRight color="royalblue" type='button' onClick={() => updateIndex('up')} size={35} />
                        </Col>
                    </Row>
                    <Container>
                        {selectedJob.details.map(function (details: JobDetails) {
                            return (
                                <li key={details.id}>{details.work_detail_text}</li>
                            )
                        })}

                    </Container>
                </> :
                <CenteredSpinner />
            }
        </Container>
    );
}
