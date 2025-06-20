import { Col, Container, Row, Image, Alert, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { SearchComponent } from "./header-children/ai-search"
import { CenteredSpinner } from "./common/centered-spinner"
import { Envelope, Github, Linkedin, PersonLinesFill, Telephone } from "react-bootstrap-icons"
import { ApplicantRecord } from "../common/interfaces"
interface Props{
    applicantData:ApplicantRecord | null,
}
export const Header = (props:Props) => {
    const [alertMsg, setAlertMsg] = useState<string | null>(null)

    useEffect(() => {

    }, [props.applicantData]);

    return (
        <Container fluid='true'>
            {alertMsg &&
                <Alert
                    dismissible
                    variant="danger"
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 1060,
                        borderRadius: 0,
                    }}
                >
                    {alertMsg}
                </Alert>
            }
            <SearchComponent
                applicant_id={applicant}
                applicant_name_first={`${props.applicantData?.user_reltn.first_name}`}
                banner_img={props.applicantData?.banner_img ? props.applicantData.banner_img : defaultBannerImg}
            />
            <Container>
                <Card className="shadow justify-content-around card-carousel" style={{ marginTop: '2rem', minHeight: '18rem', width: '100%' }}>
                    <Card.Title className="card-section-title text-center" style={{ height: '3rem' }}><PersonLinesFill className="me-2" size={18} />{props.applicantData && `${props.applicantData.user_reltn.first_name} ${props.applicantData.user_reltn.last_name}`}</Card.Title>
                    {props.applicantData ?
                        <Card.Body className="fade-in-up">
                            <Row className="text-center">
                                <Col xs={12} md={3}>
                                    <Image

                                        src={props.applicantData?.applicant_photo ? props.applicantData.applicant_photo : defaultPhoto}
                                        roundedCircle
                                        fluid
                                    />
                                </Col>
                                <Col className="bio-card-col text-left" xs={12} md={9} style={{ marginTop: '20px' }}>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.65', textAlign: 'left', whiteSpace: 'pre-line' }}>{props.applicantData?.applicant_bio}</p>
                                </Col>
                            </Row>
                            <Row className="d-flex flex-row-reverse">
                                <Col xs="auto"><a href={"https://www.linkedin.com/in/your-profile"} target="_blank" rel="noopener noreferrer">
                                    <Linkedin size={20} color='#6c63ff' />
                                </a>
                                </Col>
                               <Col xs="auto">
                                <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                                    <Github size={20}  color='#6c63ff'/>
                                </a>
                                </Col>
                              <Col xs="auto">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{props.applicantData.user_reltn.phone_number}</Tooltip>}
                                >
                                <a href={`tel:+${props.applicantData.user_reltn.phone_number}`}>
                                    <Telephone size={20}  color='#6c63ff'/>
                                </a>
                                </OverlayTrigger>
                                </Col>
                              <Col xs="auto">
                               <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{props.applicantData.user_reltn.email}</Tooltip>}
                                >
                                <a href={`mailto:${props.applicantData.user_reltn.email}`}>
                                    <Envelope size={20}  color='#6c63ff'/>
                                </a>
                                </OverlayTrigger>
                                </Col>
                            </Row>
                        </Card.Body>
                        :
                        <CenteredSpinner />
                    }
                </Card>
            </Container>
        </Container>
    );
}
