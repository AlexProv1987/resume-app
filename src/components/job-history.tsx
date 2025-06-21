import { Container, Row, Col, Card, ListGroup, Button, OverlayTrigger, Tooltip, Fade } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { ArrowRight, ArrowLeft, Activity, Briefcase, ChevronDown, ChevronUp, CaretUp, CaretUpFill, CaretDownFill } from 'react-bootstrap-icons';
import { isMobile } from "react-device-detect"
import userEvent from "@testing-library/user-event"
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
    to_date: string,
    job_title: string,
    employer_name: string,
    order: number,
}

interface JobSet {
    work: Job,
    details: JobDetails[]
}
export const JobHistory = () => {
    const jobs = useRef<JobSet[] | null>(null)
    const idx = useRef<number>(-1)

    const [selectedJob, setSelectedJob] = useState<JobSet | null>(null)
    const [totalJobs, setTotalJobs] = useState<number>(0);
    const [expanded, setExpanded] = useState(false);

    const MAX_VISIBLE = isMobile ? 3 : 6;
    const canGoBack = idx.current > 0;
    const canGoForward = jobs.current && idx.current < jobs.current.length - 1;

    useEffect(() => {
        axiosBaseURL.get(`work/history_set/?applicant=${applicant}`).then(function (response) {
            jobs.current = response.data;
            setTotalJobs(response.data.length);
            idx.current = 0
            jobs.current && setSelectedJob(jobs.current[idx.current])
        }).catch(function (error) {
            console.error('Error fetching work history:', error);
        }).finally(function () {
            //..
        })
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
            <Card className="shadow justify-content-around card-carousel" style={{ minHeight: '18rem', width: '100%' }}>
                <Card.Header className="card-section-title-left">
                    <Row>
                        <Col className="text-start">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Previous Role</Tooltip>}
                            >
                                <span
                                    role="button"
                                    tabIndex={0}
                                    className={`arrow-icon ${canGoBack ? 'clickable' : 'disabled'}`}
                                    onClick={() => canGoBack && updateIndex('down')}
                                    onKeyDown={(e) => e.key === 'Enter' && canGoBack && updateIndex('down')}
                                >
                                    <ArrowLeft size={35} />
                                </span>
                            </OverlayTrigger>
                        </Col>

                        <Col className="text-center text-dark-emphasis" style={{ alignSelf: 'center' }}>
                            <h5 className="section-title"><Briefcase className="me-1" />Employment</h5>
                        </Col>

                        <Col className="text-end">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Next Role</Tooltip>}
                            >
                                <span
                                    role="button"
                                    tabIndex={0}
                                    className={`arrow-icon ${canGoForward ? 'clickable' : 'disabled'}`}
                                    onClick={() => canGoForward && updateIndex('up')}
                                    onKeyDown={(e) => e.key === 'Enter' && canGoForward && updateIndex('up')}
                                >
                                    <ArrowRight size={35} />
                                </span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Card.Header>
                {selectedJob ?
                    <Card.Body key={selectedJob.work.id} className="fade-in-up" style={{minHeight:'33rem'}}>
                        <Row className="d-flex justify-content-between pb-2">
                            <Col className="text-start text-secondary" style={{ fontSize: '18px', fontWeight: 'bold', fontStyle: 'italic' }}>
                                {selectedJob.work.employer_name}
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-between pb-2">
                            <Col className="text-start text-secondary" style={{ fontSize: '16px', fontWeight: 'bold', fontStyle: 'italic' }}>
                                {selectedJob.work.job_title}
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-between pb-2">
                            <Col className="text-start text-secondary" style={{ fontSize: '14px' }}>
                                {selectedJob.work.from_date} - {selectedJob.work.to_date ? selectedJob.work.to_date : 'Current'}
                            </Col>
                        </Row>
                        <ListGroup variant="flush">
                            {(expanded ? selectedJob.details : selectedJob.details.slice(0, MAX_VISIBLE)).map(detail => (
                                <ListGroup.Item action key={detail.id}><span className="mr-2" ><Activity size={20} color='#BE406E' /></span> {detail.work_detail_text}</ListGroup.Item>
                            ))}
                            {selectedJob.details.length > MAX_VISIBLE && (
                                <div className="text-end mt-2">
                                    {expanded ? (
                                        <CaretUpFill role="button" color='#6c63ff' size={24} onClick={() => setExpanded(false)} />
                                    ) : (
                                        <CaretDownFill role="button" color='#6c63ff' size={24} onClick={() => setExpanded(true)} />
                                    )}
                                </div>
                            )}
                        </ListGroup>
                    </Card.Body>
                    :
                    <CenteredSpinner />
                }
                {selectedJob && (
                    <div className="text-center pb-3  card-section-title">
                        {Array.from({ length: totalJobs }).map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    display: 'inline-block',
                                    margin: '0 5px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: i === idx.current ? '#6c63ff' : '#ccc',
                                    transition: 'background-color 0.3s ease',
                                }}
                            />
                        ))}
                    </div>
                )}
            </Card>
        </Container>
    );
}
