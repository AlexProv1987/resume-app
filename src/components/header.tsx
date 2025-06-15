import { Col, Container, Row, Image } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { SearchComponent } from "./header-children/ai-search"
import { CenteredSpinner } from "./common/centered-spinner"

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
                    <Col xs={12} md={10} style={{ marginTop: '20px', marginBottom: '50px' }}>
                        {applicantData?.applicant_bio}
                    </Col>
                </Row>
                : 
                <CenteredSpinner/>
                }
            </Container>

        </Container>
    );
}
