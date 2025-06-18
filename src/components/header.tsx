import { Col, Container, Row, Image, Alert, Card } from "react-bootstrap"
import { useEffect,  useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { SearchComponent } from "./header-children/ai-search"
import { CenteredSpinner } from "./common/centered-spinner"
import {  PersonLinesFill } from "react-bootstrap-icons"

interface User {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
};

interface ApplicantRecord {
    accepting_work: string,
    applicant_bio: string,
    banner_img: string,
    applicant_photo: string,
    user_reltn: User,
};

export const Header = () => {
    const [applicantData, setApplicantData] = useState<ApplicantRecord | null>(null)
    const [alertMsg, setAlertMsg] = useState<string | null>(null)
   

    useEffect(() => {
        axiosBaseURL.get(`applicant/get_applicant/${applicant}`)
            .then(function (response) {
                setApplicantData(response.data)
            })
            .catch(function (error) {
                console.error(error)
            });
    }, []);



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
                applicant_name_first={`${applicantData?.user_reltn.first_name}`}
                banner_img={applicantData?.banner_img ? applicantData.banner_img : defaultBannerImg}
            />
            <Container>
                <Card className="shadow justify-content-around card-carousel" style={{ marginTop: '2rem', minHeight: '18rem', width: '100%' }}>
                    <Card.Title className="card-section-title text-center" style={{ height: '3rem' }}><PersonLinesFill className="me-2" size={18} />{applicantData && `${applicantData.user_reltn.first_name} ${applicantData.user_reltn.last_name}`}</Card.Title>
                    {applicantData ?
                        <Card.Body className="fade-in-up">
                            <Row className="text-center">
                                <Col xs={12} md={3}>
                                    <Image

                                        src={applicantData?.applicant_photo ? applicantData.applicant_photo : defaultPhoto}
                                        roundedCircle
                                        fluid
                                    />
                                </Col>
                                <Col className="bio-card-col text-left" xs={12} md={9} style={{ marginTop: '20px', marginBottom: '50px' }}>
                                    <p style={{ fontSize: '1rem', lineHeight: '1.65', textAlign: 'left', whiteSpace: 'pre-line' }}>{applicantData?.applicant_bio}</p>
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

/**
 * 
 * <span style={{ color: 'royalblue', fontFamily: 'monospace', fontSize: '1rem' }}>
                            {'{'} <span
                                style={{ color: 'white', cursor: 'pointer' }}
                                onClick={applicantData ? () => requestContact() : () => { }}>
                                {applicantData ? `Contact: ${applicantData.user_reltn.first_name} ${applicantData.user_reltn.last_name}` : 'Loading...'}
                            </span> {'}'}
                        </span>
 */