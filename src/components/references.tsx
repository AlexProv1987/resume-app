import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { FileEarmarkPerson } from 'react-bootstrap-icons';
interface Reference {
  id: number,
  name: string,
  relation: string,
  job_title: string,
}
export const References = () => {
  const [references, setReferences] = useState<Reference[] | null>(null)
  useEffect(() => {
    axiosBaseURL.get(`details/references/?applicant=${applicant}`)
      .then(function (response) {
        setReferences(response.data)
      })
      .catch(function (error) {
        console.error(`Error Fetching References: ${error}`)
      });
  }, []);

  return (
    <Card className="shadow" style={{ width: '20rem', marginBottom: '1rem' }}>
      <Card.Header>References</Card.Header>
      {references ?
        <Card.Body>
          {references.map(function (reference: Reference) {
            return (
              <div className="pb-3" key={reference.id}>
                <Card.Title>
                  <span><FileEarmarkPerson size={25} color='indianRed'/></span> {reference.name}
                </Card.Title>
                <Card.Text className="m-0" style={{ fontSize: '14px' }}>{reference.relation} - {reference.job_title}</Card.Text>
              </div>
            )
          })}
        </Card.Body>
        : <CenteredSpinner />
      }
    </Card>
  );
}