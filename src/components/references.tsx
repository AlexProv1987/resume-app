import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant, defaultPhoto, defaultBannerImg } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
interface Reference {
  id: number,
  name: string,
  relation: string,
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
    <Card style={{ width: '20rem', marginBottom: '1rem' }}>
      <Card.Header>References</Card.Header>
      {references ?
        <Card.Body>
         {references.map(function (reference: Reference) {
                     return (
                       <div className="border-bottom pb-1" key={reference.id}>
                         <Card.Text>{`Name: ${reference.name}`}</Card.Text>
                         <Card.Text>{`Relation: ${reference.relation}`}</Card.Text>
                       </div>
                     )
                   })}
        </Card.Body>
        : <CenteredSpinner />
      }
    </Card>
  );
}
