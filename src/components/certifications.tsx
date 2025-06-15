import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { BookmarkPlus } from 'react-bootstrap-icons';

interface Certification {
    id: number,
    attained_on: string,
    name: string,
}
export const Certifications = () => {

    const [certifications, setCertifications] = useState<Certification[] | null>(null)

    useEffect(() => {
        axiosBaseURL.get(`details/certifications/?applicant=${applicant}`)
            .then(function (response) {
                setCertifications(response.data)
            })
            .catch(function (error) {
                console.error(`Error Fetching certifications: ${error}`)
            });
    }, []);

    return (
        <Card className="shadow" style={{ width: '20rem', marginBottom: '1rem' }}>
            <Card.Header>Certifications</Card.Header>
            {certifications ?
                <Card.Body>
                    {certifications.map(function (certification: Certification) {
                        return (
                            <div className="pb-2" key={certification.id}>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{certification.name}</Tooltip>}
                                >
                                    <Card.Text style={{ fontSize: '14px' }}><span><BookmarkPlus size={25} color='green' /></span>{certification.name.length > 30 ? certification.name.substring(0, 30) + '...' : certification.name}</Card.Text>
                                </OverlayTrigger>
                            </div>
                        )
                    })
                    }
                </Card.Body>
                : <CenteredSpinner />
            }
        </Card>
    );
}
