import { Card, Container, Col, Button, Modal, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { ArrowRight, ArrowLeft, Github, Youtube, Git, Wrench } from 'react-bootstrap-icons';
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
    const ITEMS_PER_PAGE = 1;
    const canGoBack = projectStartIndex > 0;
    const canGoForward = projects && projectStartIndex + ITEMS_PER_PAGE < projects.length;
    const paginatedProjects = projects?.slice(projectStartIndex, projectStartIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        axiosBaseURL.get(`projects/project_set/?applicant=${applicant}`).then(function (response) {
            setProjects(response.data)
        }).catch(function (error) {
            console.error('Error fetching work history:', error);
        }).finally(function () {
            //..
        })
    }, []);

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
                <Card.Header className="card-section-title">
                    <Row>
                        <Col className="text-start">
                            <ArrowLeft
                                color={canGoBack ? "royalblue" : "lightgray"}
                                type="button"
                                onClick={() => {
                                    if (canGoBack) {
                                        setProjectStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
                                    }
                                }}
                                size={35}
                                style={{ cursor: canGoBack ? 'pointer' : 'not-allowed' }}
                            />
                        </Col>
                        <Col className="text-center" style={{ alignSelf: 'center' }}>
                            <h5 className="section-title"><Wrench className="me-1" /> Projects</h5>
                        </Col>
                        <Col className="text-end">
                            <ArrowRight
                                color={canGoForward ? "royalblue" : "lightgray"}
                                type="button"
                                onClick={() => {
                                    if (canGoForward) {
                                        setProjectStartIndex((prev) => prev + ITEMS_PER_PAGE);
                                    }
                                }}
                                size={35}
                                style={{ cursor: canGoForward ? 'pointer' : 'not-allowed' }}
                            />
                        </Col>
                    </Row>
                </Card.Header>

                {projects ? (
                    <Row className="m-3">
                        {paginatedProjects?.map((project: ProjectSet) => (
                            <Col className="mb-2 d-flex" key={project.project.id}>
                                <Card className="shadow" style={{ minHeight: '18rem' }}>
                                    <Card.Header><h5 style={{ font: 'helvetica' }}>{project.project.name}</h5></Card.Header>
                                    <Card.Body>
                                        <Card.Text>{project.project.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
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
            </Card>

            <Modal show={show} onHide={() => handleShow(null)}>
                <Modal.Header className="bg-light" closeButton>
                    <Modal.Title >{selectedItem.current?.project.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem.current?.details.map((detail: ProjectDetails) => (
                        <li key={detail.id}>{detail.detail_text}</li>
                    ))}
                </Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button className="btn-sm" variant="danger" onClick={() => handleShow(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
}
