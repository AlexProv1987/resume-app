import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../../constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { ArrowBarDown, Award, AwardFill, BookmarkPlus, CaretDownFill, CaretUpFill, ChevronDoubleDown, ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { isMobile } from "react-device-detect"

interface Certification {
    id: number,
    reward_description: string,
    reward_name: string,
}

export const Awards = () => {
    const [expanded, setExpanded] = useState(false);
    const [awards, setAwards] = useState<Certification[] | null>(null)

    const MAX_VISIBLE = 3

    useEffect(() => {
        axiosBaseURL.get(`details/awards/?applicant=${applicant}`)
            .then(function (response) {
                setAwards(response.data);
            })
            .catch(function (error) {
                console.error(`Error Fetching certifications: ${error}`)
            });
    }, []);

    if (awards && awards.length === 0) {
        return null;
    }

    return (
        <Card className="shadow card-accent gold" style={{ width: `${isMobile ? '95%' : '20rem'}`, marginBottom: '1rem' }}>
            <Card.Header className="text-secondary-emphasis">
            <Row>
                <Col>
                    Recognition
                </Col>
                <Col>
                 {awards && awards.length > MAX_VISIBLE && (
                        <div className="text-end pb-1">
                            {expanded ? (
                                <CaretUpFill role="button" color='gold' size={20} onClick={() => setExpanded(false)} />
                            ) : (
                                <CaretDownFill role="button" color='gold' size={20} onClick={() => setExpanded(true)} />
                            )}
                        </div>
                    )}
                </Col>
            </Row>    
            </Card.Header>
            {awards ?
                <Card.Body>
                    {(expanded ? awards : awards.slice(0, MAX_VISIBLE)).map(award => (
                        <div className="pb-1" key={award.id}>
                            <Card.Text className="text-secondary" style={{ fontSize: '14px' }}>
                                <span><Award size={25} color='gold' /></span>{award.reward_name.length > 30 ? award.reward_name.substring(0, 30) + '...' : award.reward_name}
                            </Card.Text>
                        </div>
                    ))}
                </Card.Body>
                : <CenteredSpinner />
            }
        </Card>
    );
}
