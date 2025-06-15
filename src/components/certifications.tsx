import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
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
                console.log(response.data)
                setCertifications(response.data)
            })
            .catch(function (error) {
                console.error(`Error Fetching certifications: ${error}`)
            });
    }, []);

    return (
        <Card style={{ width: '20rem', marginBottom: '1rem' }}>
            <Card.Header>Certifications</Card.Header>
            {certifications ?
                <Card.Body>
                    {certifications.map(function (certification: Certification) {
                        return (
                            <div className="border-bottom pb-1" key={certification.id}>
                                <Card.Text>{certification.name}</Card.Text>
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
