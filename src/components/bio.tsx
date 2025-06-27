import { useRef } from "react"
import { Row, Col, Image, Card } from "react-bootstrap"
import { CenteredSpinner } from "./common/centered-spinner"
import { getSocialIcon, getContactIcon } from "../common/icon-maps"
import { ApplicantRecord } from "../common/interfaces"
import { Social, ContactMethod } from "../common/interfaces"
import { PersonLinesFill } from "react-bootstrap-icons"


interface SearchCompProps {
    applicantData: ApplicantRecord | null
}

//we need to check device for width needs to be 100% on mobile
export const BioComponent = (props: SearchCompProps) => {
    const iconContainerRef = useRef<HTMLDivElement>(null);

    return (
        <Card className="shadow justify-content-around card-carousel" style={{ marginTop: '2rem', minHeight: '18rem', width: '100%' }}>
            <Card.Title className="card-section-title-left text-center text-dark-emphasis" style={{ height: '3rem' }}><PersonLinesFill className="me-2" size={18} />{props.applicantData && `${props.applicantData.user_reltn.first_name} ${props.applicantData.user_reltn.last_name}`}</Card.Title>
            {props.applicantData ?
                <Card.Body className="fade-in-up pb-0">
                    <Row className="text-center">
                        <Col xs={12} md={3}>
                            <Image

                                src={props.applicantData?.applicant_photo ? props.applicantData.applicant_photo : 'default_profile.png'}
                                roundedCircle
                                fluid
                            />
                        </Col>
                        <Col className="bio-card-col text-left" xs={12} md={9} style={{ marginTop: '20px' }}>
                            <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.65', textAlign: 'left', whiteSpace: 'pre-line' }}>{props.applicantData?.applicant_bio}</p>
                        </Col>
                    </Row>
                    <Row className="d-flex flex-row-reverse card-section-title" ref={iconContainerRef}>
                        {props.applicantData?.social?.length !== 0 &&
                            props.applicantData.social.slice(0, 2).map((social: Social, idx: number) => {

                                const iconConfig = getSocialIcon(social.platform);

                                const IconComponent = iconConfig.component;
                                const href = iconConfig.getHref(social.url);

                                const iconElement = (
                                    <a href={href} target="_blank" rel="noreferrer">
                                        <IconComponent size={20} color="#6c63ff" />
                                    </a>
                                );

                                const wrapped = iconConfig.renderWrapper
                                    ? iconConfig.renderWrapper(iconElement, social.platform, iconContainerRef.current)
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
                                    ? iconConfig.renderWrapper(iconElement, contact.value,)
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
    )
}