import { Card, Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { CaretDownFill, CaretUpFill, Mortarboard } from 'react-bootstrap-icons';
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
  const [expanded, setExpanded] = useState(false);

  const MAX_VISIBLE = 3

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
    <Card className="shadow card-accent blue" style={{ width: `${isMobile ? '95%' : '20rem'}`, marginBottom: '1rem' }}>
      <Card.Header className="card-header text-secondary-emphasis">
        <Row>
          <Col>
            Education
          </Col>
          <Col>
            {education && education.length > MAX_VISIBLE && (
              <div className="text-end pb-1">
                {expanded ? (
                  <CaretUpFill role="button" color='#1A73E8' size={20} onClick={() => setExpanded(false)} />
                ) : (
                  <CaretDownFill role="button" color='#1A73E8' size={20} onClick={() => setExpanded(true)} />
                )}
              </div>
            )}
          </Col>
        </Row>
      </Card.Header>
      {education ?
        <Card.Body className="text-secondary">
          {(expanded ? education : education.slice(0, MAX_VISIBLE)).map(edu => (
            <div className="pb-3" key={edu.id}>
              <Card.Title>
                <span><Mortarboard size={25} color='#1A73E8' /></span> {edu.name}
              </Card.Title>
              <Card.Text style={{ fontSize: '14px', fontStyle: 'italic' }} className="mb-0">{edu.education_level}</Card.Text>
              <Card.Text style={{ fontSize: '14px', fontStyle: 'italic' }}>{edu.area_of_study}</Card.Text>
            </div>
          ))}
        </Card.Body>
        : <CenteredSpinner />
      }
    </Card>
  );
}
