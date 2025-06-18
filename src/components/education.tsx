import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { Mortarboard } from 'react-bootstrap-icons';
import { isMobile } from "react-device-detect"
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
    <Card className="shadow card-accent blue" style={{ width:`${isMobile ? '95%': '20rem'}`, marginBottom: '1rem' }}>
      <Card.Header className="card-header">Education</Card.Header>
      {education ?
        <Card.Body>
          {education.map(function (education: Education) {
            return (
              <div className="pb-3" key={education.id}>
                <Card.Title>
                  <span><Mortarboard size={25} color='blue' /></span> {education.name}
                </Card.Title>
                <Card.Text style={{ fontSize: '14px' }} className="mb-0">{education.education_level}</Card.Text>
                <Card.Text style={{ fontSize: '14px' }}>{education.area_of_study}</Card.Text>
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
