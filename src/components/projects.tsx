import { Card, Container, Col, Button, Modal, Row, OverlayTrigger, Tooltip, ListGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { ArrowRight, ArrowLeft, Github, Youtube, Git, Wrench, Activity } from 'react-bootstrap-icons';
import { CenteredSpinner } from "./common/centered-spinner"

interface ProjectDetails {
    id: string,
    detail_img: string,
    detail_text: string,
}

interface Project {
    index: number,
    id: string,
    demo_url: string,
    video_url: string,
    source_control_url: string,
    description: string,
    name: string,
}

interface ProjectSet {
    project: Project,
    details: ProjectDetails[],
}

export const Projects = () => {
    const [projects, setProjects] = useState<ProjectSet[] | null>(null)
    const [show, setShow] = useState<boolean>(false)
    const [projectStartIndex, setProjectStartIndex] = useState(0);
    const selectedItem = useRef<ProjectSet | null>(null)

    //opting to create some custom pagination b/c fk caoursel jankery
    const ITEMS_PER_PAGE = 2;
    const canGoBack = projectStartIndex > 0;
    const canGoForward = projects && projectStartIndex + ITEMS_PER_PAGE < projects.length;
    const paginatedProjects = projects?.slice(projectStartIndex, projectStartIndex + ITEMS_PER_PAGE);
    const CHAR_LIMIT = 300;

    useEffect(() => {
        axiosBaseURL.get(`projects/project_set/?applicant=${applicant}`).then(function (response) {
            setProjects(response.data)
        }).catch(function (error) {
            console.error('Error fetching work history:', error);
        }).finally(function () {
            //..
        })
    }, []);

    //hook to create the autoplay effect
    useEffect(() => {
        if (!projects || projects.length <= 1) {
            return;
        }
        const interval = setInterval(() => {
            setProjectStartIndex((prev) => {
                if (prev + ITEMS_PER_PAGE < projects.length) {
                    return prev + ITEMS_PER_PAGE;
                } else {
                    return 0;
                }
            });
        }, 90000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [projects]);

    const handleShow = (item: ProjectSet | null) => {
        selectedItem.current = item
        setShow(!show)
    }

    if (projects && projects.length === 0) {
        return null;
    }

    return (
        <Container style={{ marginTop: '3rem', marginBottom: '2rem' }}>
            <Card className="shadow justify-content-around card-carousel" style={{ minHeight: '16rem', width: '100%' }}>
                <Card.Header className="card-section-title-left">
                    <Row>
                        <Col className="text-start">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Previous</Tooltip>}
                            >
                                <span
                                    role="button"
                                    tabIndex={0}
                                    className={`arrow-icon ${canGoBack ? 'clickable' : 'disabled'}`}
                                    onClick={() => {
                                        if (canGoBack) {
                                            setProjectStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
                                        }
                                    }}>
                                    <ArrowLeft size={35} />
                                </span>
                            </OverlayTrigger>
                        </Col>
                        <Col className="text-center" style={{ alignSelf: 'center' }}>
                            <h5 className="section-title"><Wrench className="me-1" /> Projects</h5>
                        </Col>
                        <Col className="text-end">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Next</Tooltip>}
                            >
                                <span
                                    role="button"
                                    tabIndex={0}
                                    className={`arrow-icon ${canGoForward ? 'clickable' : 'disabled'}`}
                                    onClick={() => {
                                        if (canGoForward) {
                                            setProjectStartIndex((prev) => prev + ITEMS_PER_PAGE);
                                        }
                                    }}>
                                    <ArrowRight size={35} />
                                </span>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Card.Header>

                {projects ? (
                    <Row className="m-3">
                        {paginatedProjects?.map((project: ProjectSet) => (
                            <Col className="mb-2 d-flex fade-in-up" key={project.project.id}>
                                <Card className="shadow" style={{ minHeight: '18rem' }}>
                                    <Card.Header className="card-section-title-left"><h5 style={{ font: 'helvetica' }}>{project.project.name}</h5></Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                            {project.project.description.length > CHAR_LIMIT ? (
                                                <>
                                                    {project.project.description.slice(0, CHAR_LIMIT)}...
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className="p-0 ms-1 align-baseline"
                                                        onClick={() => handleShow(project)}
                                                    >
                                                        more
                                                    </Button>
                                                </>
                                            ) : (
                                                project.project.description
                                            )}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-end card-section-title">
                                        <a target="_blank"
                                            rel='noreferrer'
                                            style={{ cursor: `${project.project.source_control_url ? 'pointer' : 'not-allowed'}` }}
                                            href={project.project.source_control_url}
                                        >
                                            <Github size={26} className="m-1" color={project.project.source_control_url ? "black" : "lightgray"} />
                                        </a>
                                        <a target="_blank"
                                            rel='noreferrer'
                                            style={{ cursor: `${project.project.video_url ? 'pointer' : 'not-allowed'}` }}
                                            href={project.project.video_url}>
                                            <Youtube size={26} className="m-1" color={project.project.video_url ? "red" : "lightgray"} />
                                        </a>
                                        <a target="_blank"
                                            rel='noreferrer'
                                            style={{ cursor: `${project.project.demo_url ? 'pointer' : 'not-allowed'}` }}
                                            href={project.project.demo_url}
                                        >
                                            <Git size={26} className="m-1" color={project.project.demo_url ? "royalblue" : "lightgray"} />
                                        </a>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <CenteredSpinner />
                )}
                {projects && projects.length > ITEMS_PER_PAGE && (
                    <div className="text-center pb-3  card-section-title">
                        {Array.from({ length: Math.ceil(projects.length / ITEMS_PER_PAGE) }).map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    display: 'inline-block',
                                    margin: '0 5px',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: i === Math.floor(projectStartIndex / ITEMS_PER_PAGE) ? '#6c63ff' : '#ccc',
                                    transition: 'background-color 0.3s ease',
                                }}
                            />
                        ))}
                    </div>
                )}
            </Card>

            <Modal show={show} onHide={() => handleShow(null)}>
                <Modal.Header className="card-section-title-left" closeButton>
                    <Modal.Title >{selectedItem.current?.project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{selectedItem.current?.project.description}</p>
                    <ListGroup variant="flush">
                    {selectedItem.current?.details.map((detail: ProjectDetails) => (
                        <ListGroup.Item action key={detail.id}><span className="mr-2" ><Activity size={20} color='#BE406E' /></span> {detail.detail_text}</ListGroup.Item>
                    ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer className="card-section-title">
                    <Button className="btn-sm custom-cancel" onClick={() => handleShow(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
}
