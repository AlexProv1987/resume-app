import { Card, Carousel, Container, Col, Button, Modal, Row } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';
import { CenteredSpinner } from "./common/centered-spinner"
interface ProjectDetails {
    id: string,
    detail_img: string,
    detail_text: string,
}

interface Project {
    index: number,
    id: string,
    demo_url: boolean,
    description: string,
    name: string,
    source_control_url: string,
    details: ProjectDetails[],
}

export const Projects = () => {
    const [projects, setProjects] = useState<Project[] | null>(null)
    const [show, setShow] = useState<boolean>(false)
    const [projectStartIndex, setProjectStartIndex] = useState(0);
    const selectedItem = useRef<Project | null>(null)

    //opting to create some custom pagination b/c fk caoursel jankery
    const ITEMS_PER_PAGE = 2;
    const canGoBack = projectStartIndex > 0;
    const canGoForward = projects && projectStartIndex + ITEMS_PER_PAGE < projects.length;
    const paginatedProjects = projects?.slice(projectStartIndex, projectStartIndex + ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchProjectsWithDetails = async () => {
            try {
                //opting for await here over promise chaining to control execution more since
                //we dont want to set the state var until we have gathered everything.
                const response = await axiosBaseURL.get(`projects/get_projects/?applicant=${applicant}`);
                const tmp: Project[] = response.data;
                const detailedProjects = await Promise.all(
                    tmp.map(async (project: Project, idx) => {
                        try {
                            const detailsRes = await axiosBaseURL.get(`/projects/project_details/?project=${project.id}`);
                            return {
                                ...project,
                                index: idx,
                                details: detailsRes.data,
                            };
                        } catch (error) {
                            console.error(`Error fetching details for project ${project.id}`);
                            return project;
                        }
                    })
                );
                setProjects(detailedProjects)
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjectsWithDetails()
    }, []);

    const handleShow = (item: Project | null) => {
        selectedItem.current = item
        setShow(!show)
    }

    return (
        <Container style={{ marginTop: '3rem' }}>
            <Card className="shadow justify-content-around" style={{ minHeight: '16rem', width: '100%' }}>
                <Card.Header>
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
                            <h5>Projects</h5>
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
                        {paginatedProjects?.map((project: Project) => (
                            <Col lg={6} key={project.id}>
                                <Card className="shadow" style={{ minHeight: '18rem'}}>
                                    <Card.Header>{project.name}</Card.Header>
                                    <Card.Body>
                                        <Card.Text>{project.description}</Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        <Button onClick={() => handleShow(project)}>Details</Button>
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
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem.current?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Source Control: {selectedItem.current?.source_control_url}</p>
                    {selectedItem.current?.details.map((details: ProjectDetails) => (
                        <li key={details.id}>{details.detail_text}</li>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleShow(null)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
