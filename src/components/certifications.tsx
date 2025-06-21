import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { BookmarkPlus, CaretDown, CaretDownFill, CaretUp, CaretUpFill, ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { isMobile } from "react-device-detect"

interface Certification {
    id: number,
    attained_on: string,
    name: string,
}

export const Certifications = () => {
    const [expanded, setExpanded] = useState(false);
    const [certifications, setCertifications] = useState<Certification[] | null>(null)

    const MAX_VISIBLE = 3

    useEffect(() => {
        axiosBaseURL.get(`details/certifications/?applicant=${applicant}`)
            .then(function (response) {
                setCertifications(response.data);
            })
            .catch(function (error) {
                console.error(`Error Fetching certifications: ${error}`)
            });
    }, []);

    if (certifications && certifications.length === 0) {
        return null;
    }

    return (
        <Card className="shadow card-accent green text-secondary-emphasis" style={{ width: `${isMobile ? '95%' : '20rem'}`, marginBottom: '1rem' }}>
            <Card.Header>
                <Row>
                    <Col>
                        Certifications
                    </Col>
                    <Col>
                        {certifications && certifications.length > MAX_VISIBLE && (
                            <div className="text-end pb-1">
                                {expanded ? (
                                    <CaretUpFill role="button" color='green' size={20} onClick={() => setExpanded(false)} />
                                ) : (
                                    <CaretDownFill role="button" color='green' size={20} onClick={() => setExpanded(true)} />
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </Card.Header>
            {certifications ?
                <Card.Body>
                    {(expanded ? certifications : certifications.slice(0, MAX_VISIBLE)).map(certification => (
                        <div className="pb-2" key={certification.id}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>{certification.name}</Tooltip>}
                                container={() => document.body}>
                                <Card.Text className="text-secondary" style={{ fontSize: '14px' }}><span><BookmarkPlus size={25} color='green' /></span>{certification.name.length > 30 ? certification.name.substring(0, 30) + '...' : certification.name}</Card.Text>
                            </OverlayTrigger>
                        </div>
                    ))}
                </Card.Body>
                : <CenteredSpinner />
            }
        </Card>
    );
}
