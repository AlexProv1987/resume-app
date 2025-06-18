import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { Award, BookmarkPlus } from 'react-bootstrap-icons';
import { isMobile } from "react-device-detect"

interface Certification {
    id: number,
    reward_description: string,
    reward_name: string,
}

export const Awards = () => {

    const [awards, setAwards] = useState<Certification[] | null>(null)

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
            <Card.Header>Awards & Recognition</Card.Header>
            {awards ?
                <Card.Body>
                    {awards.map(function (award: Certification) {
                        return (
                            <div className="pb-2" key={award.id}>
                                <Card.Text style={{ fontSize: '14px' }}><span><Award size={25} color='gold' /></span>{award.reward_name.length > 30 ? award.reward_name.substring(0, 30) + '...' : award.reward_name}</Card.Text>
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
