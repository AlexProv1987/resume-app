import { Card, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { isMobile } from "react-device-detect"
interface Skill {
  id: string,
  skill_name: string,
  skill_description: string,
  years_of_experience: number,
  skill_logo: string,
}
export const Skills = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null)

  useEffect(() => {
    axiosBaseURL.get(`details/skills/?applicant=${applicant}`)
      .then(function (response) {
        setSkills(response.data)
      })
      .catch(function (error) {
        console.error(`Error Fetching Skills: ${error}`)
      });

  }, []);
  
  if(skills && skills.length === 0){
    return null;
  }
  
  return (
    <Card className="shadow card-accent teal" style={{ width:`${isMobile ? '95%': '20rem'}`, marginBottom: '1rem' }}>
      <Card.Header className="text-secondary-emphasis">Skills</Card.Header>
      {skills ?
        <Card.Body>
          <Row>
            {skills.map(function (skill: Skill) {
              return (
                <Col className="pb-3" key={skill.id}>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{skill.skill_name} - {skill.years_of_experience} Yrs. Experience</Tooltip>}
                    container={() => document.body}
                  >
                    <Card.Img variant="top" style={{ maxHeight: '40px', maxWidth: '40px' }} src={skill.skill_logo} />
                  </OverlayTrigger>
                </Col>
              )
            })}
          </Row>
        </Card.Body>
        : <CenteredSpinner />
      }
    </Card>
  );
}