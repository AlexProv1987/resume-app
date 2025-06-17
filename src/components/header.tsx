import { Col, Container, Row, Image, Navbar, OverlayTrigger, Tooltip, Alert } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { SearchComponent } from "./header-children/ai-search"
import { CenteredSpinner } from "./common/centered-spinner"
import { Download } from "react-bootstrap-icons"

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
    const [hasResume,setHasResume] = useState<boolean>(false)

    useEffect(() => {
        axiosBaseURL.get(`applicant/get_applicant/${applicant}`)
            .then(function (response) {
                setApplicantData(response.data)
            })
            .catch(function (error) {
                console.error(error)
            });
    }, []);

    const getResume = () => {
        if(hasResume){
            return;
        }
        axiosBaseURL
            .get(`applicant/get_resume/${applicant}`, {
                responseType: 'blob',
            })
            .then((response) => {
                setHasResume(true)
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = 'resume.pdf';
                link.click();
            })
            .catch((error) => {
                console.error('Error Getting Resume:', error);
            });
    }

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
            <Navbar className="navbar-dark bg-dark" style={{ position: 'relative', overflow: 'hidden' }}>
                <Container fluid>
                    <Navbar.Brand>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <OverlayTrigger
                            placement="left"
                            overlay={<Tooltip>{hasResume ? "You already have this resume." : "Download Resume."}</Tooltip>}>
                            <Navbar.Text  style={{ cursor: hasResume ? 'not-allowed' : 'pointer' }} onClick={() => getResume()}>
                                <Download size={24} color='royalblue' />
                            </Navbar.Text>
                        </OverlayTrigger>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SearchComponent
                applicant_id={applicant}
                applicant_name_first={`${applicantData?.user_reltn.first_name}`}
                banner_img={applicantData?.banner_img ? applicantData.banner_img : defaultBannerImg}
            />
            <Container>
                {applicantData ?
                    <Row className="text-center" style={{ paddingTop: '50px', }}>
                        <Col xs={12} md={2}>
                            <Image
                                src={applicantData?.applicant_photo ? applicantData.applicant_photo : defaultPhoto}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col className="text-left" xs={12} md={10} style={{ marginTop: '20px', marginBottom: '50px' }}>
                            <p style={{ textAlign: 'left', whiteSpace: 'pre-line' }}>{applicantData?.applicant_bio}</p>
                        </Col>
                    </Row>
                    :
                    <CenteredSpinner />
                }
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