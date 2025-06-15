import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
interface Education {
  id: number,
  area_of_study: string,
  currently_attending: boolean,
  education_level: string,
  from_date: string,
  to_date: string,
  name: string,
}
export const EducationHistory = () => {

  const [education, setEducation] = useState<Education[] | null>(null)

  useEffect(() => {
    axiosBaseURL.get(`details/education/?applicant=${applicant}`)
      .then(function (response) {
        setEducation(response.data)
      })
      .catch(function (error) {
        console.error(`Error Fetching Education: ${error}`)
      });
  }, []);

  return (
    <Card style={{ width: '20rem', marginBottom: '1rem' }}>
      <Card.Header>Education</Card.Header>
      {education ?
        <Card.Body>
          {education.map(function (education: Education) {
            return (
              <div className="border-bottom pb-1" key={education.id}>
                <Card.Text>{education.name}</Card.Text>
                <Card.Text>{education.area_of_study}</Card.Text>
                <Card.Text>{`${education.from_date} - ${education.to_date}`}</Card.Text>
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
