import { Card, Carousel, Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { SocialIcon } from "react-social-icons"
import { CenteredSpinner } from "./common/centered-spinner"
interface ProjectDetails {
    id: string,
    detail_img: string,
    detail_text: string,
}

interface Project {
    id: string,
    demo_url: boolean,
    description: string,
    name: string,
    source_control_url: string,
    details: ProjectDetails[],
}

export const Projects = () => {
    const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        const fetchProjectsWithDetails = async () => {
            try {
                //opting for await here over promise chaining to control execution more since
                //we dont want to set the state var until we have gathered everything.
                const response = await axiosBaseURL.get(`projects/get_projects/?applicant=${applicant}`);
                const tmp: Project[] = response.data;
                const detailedProjects = await Promise.all(
                    tmp.map(async (project) => {
                        try {
                            const detailsRes = await axiosBaseURL.get(`/projects/project_details/?project=${project.id}`);
                            return {
                                ...project,
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

    return (
        <Card style={{ marginBottom: '1rem', marginTop: '2.7rem' }}>
            {projects ?
                <Carousel interval={null} variant="dark" style={{ minHeight: '200px' }}>
                    {projects.map(function (project: Project) {
                        return (
                            <Carousel.Item key={project.id} style={{ marginBottom: '3rem' }}>
                                <Container style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', }}>
                                    <h5>
                                        {project.source_control_url &&
                                            <SocialIcon network='github' />
                                        }
                                        {project.name}
                                    </h5>
                                    {project.details.map(function (details: ProjectDetails) {
                                        return (
                                            <li key={details.id}>{details.detail_text}</li>
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
