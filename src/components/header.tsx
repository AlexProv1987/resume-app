import { Col, Container, Row, Image, Alert, Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import React, { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { SearchComponent } from "./header-children/ai-search"
import { CenteredSpinner } from "./common/centered-spinner"
import { Envelope, Github, Linkedin, PersonLinesFill, Telephone, Whatsapp } from "react-bootstrap-icons"
import { ApplicantRecord, ContactMethod, Social } from "../common/interfaces"
import { getContactIcon, getSocialIcon } from "../common/icon-maps"

interface Props {
    applicantData: ApplicantRecord | null,
}
export const Header = (props: Props) => {
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
                    <Card.Title className="card-section-title-left text-center text-dark-emphasis" style={{ height: '3rem' }}><PersonLinesFill className="me-2" size={18} />{props.applicantData && `${props.applicantData.user_reltn.first_name} ${props.applicantData.user_reltn.last_name}`}</Card.Title>
                    {props.applicantData ?
                        <Card.Body className="fade-in-up pb-0">
                            <Row className="text-center">
                                <Col xs={12} md={3}>
                                    <Image

                                        src={props.applicantData?.applicant_photo ? props.applicantData.applicant_photo : defaultPhoto}
                                        roundedCircle
                                        fluid
                                    />
                                </Col>
                                <Col className="bio-card-col text-left" xs={12} md={9} style={{ marginTop: '20px' }}>
                                    <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.65', textAlign: 'left', whiteSpace: 'pre-line' }}>{props.applicantData?.applicant_bio}</p>
                                </Col>
                            </Row>
                            <Row className="d-flex flex-row-reverse card-section-title">
                                  {props.applicantData?.social?.length !== 0 &&
                                    props.applicantData.social.map((social: Social, idx: number) => {

                                        const iconConfig = getSocialIcon(social.platform);
                                        
                                        const IconComponent = iconConfig.component;
                                        const href = iconConfig.getHref(social.url);

                                        const iconElement = (
                                            <a href={href} target="_blank" rel="noreferrer">
                                                <IconComponent size={20} color="#6c63ff" />
                                            </a>
                                        );

                                        const wrapped = iconConfig.renderWrapper
                                            ? iconConfig.renderWrapper(iconElement, social.platform)
                                            : iconElement;

                                        return (
                                            <Col xs="auto" key={idx}>
                                                {wrapped}
                                            </Col>
                                        );
                                    })}
                                {props.applicantData?.contact_method?.length !== 0 &&
                                    props.applicantData.contact_method.map((contact: ContactMethod, idx: number) => {

                                        const iconConfig = getContactIcon(contact.contact_type);
                                        
                                        const IconComponent = iconConfig.component;
                                        const href = iconConfig.getHref(contact.value);

                                        const iconElement = (
                                            <a href={href} target="_blank" rel="noreferrer">
                                                <IconComponent size={20} color="#6c63ff" />
                                            </a>
                                        );

                                        const wrapped = iconConfig.renderWrapper
                                            ? iconConfig.renderWrapper(iconElement, contact.value)
                                            : iconElement;

                                        return (
                                            <Col xs="auto" key={idx}>
                                                {wrapped}
                                            </Col>
                                        );
                                    })}
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
