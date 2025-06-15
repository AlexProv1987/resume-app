import { Container, Fade, Row, Col, Card } from "react-bootstrap"
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

    const canGoBack = idx.current > 0;
    const canGoForward = jobs.current && idx.current < jobs.current.length - 1;

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
        switch (direction) {
            case 'up':
                idx.current += 1
                setSelectedJob(jobs?.current ? jobs.current[idx.current] : null)
                return;
            case 'down':
                idx.current -= 1
                setSelectedJob(jobs?.current ? jobs.current[idx.current] : null)
                return;
            default:
                return;
        }
    }

    return (
        <Container>
            <Card className="shadow justify-content-around" style={{ minHeight: '18rem', width: '100%' }}>
                <Card.Header>
                    <Row>
                        <Col className="text-start">
                            <ArrowLeft
                                color={canGoBack ? "royalblue" : "lightgray"}
                                type="button"
                                size={35}
                                onClick={() => {
                                    if (canGoBack) updateIndex('down');
                                }}
                                style={{ cursor: canGoBack ? 'pointer' : 'not-allowed' }}
                            />
                        </Col>
                        <Col className="text-center" style={{ alignSelf: 'center' }}>
                            <h5>{selectedJob ? selectedJob.employer_name : 'Job History'}</h5>
                        </Col>
                        <Col className="text-end">
                            <ArrowRight
                                color={canGoForward ? "royalblue" : "lightgray"}
                                type="button"
                                size={35}
                                onClick={() => {
                                    if (canGoForward) updateIndex('up');
                                }}
                                style={{ cursor: canGoForward ? 'pointer' : 'not-allowed' }}
                            />
                        </Col>
                    </Row>
                </Card.Header>
                {selectedJob ?
                    <Card.Body>
                        <Card.Text>
                            {selectedJob.employer_name}
                            {selectedJob.details.map(function (details: JobDetails) {
                                return (
                                    <li key={details.id}>{details.work_detail_text}</li>
                                )
                            })}
                        </Card.Text>
                    </Card.Body>
                    :
                    <CenteredSpinner />
                }
            </Card>
        </Container>
    );
}
