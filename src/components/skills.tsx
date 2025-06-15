import { Card, Col, Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
interface Skill {
  id: string,
  skill_name: string,
  skill_description: string,
  years_of_experience: number,
  skill_logo:string,
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
  //check if mobile for width
  return (
    <Card className="shadow" style={{ width: '20rem', marginBottom: '1rem' }}>
      <Card.Header>Skills</Card.Header>
      {skills ?
        <Card.Body>
          <Row>
            {skills.map(function (skill: Skill) {
              return (
                <Col className="pb-3" key={skill.id}>
                  <Card.Img variant="top" style={{ maxHeight: '40px', maxWidth: '40px' }} src={skill.skill_logo} />
                  <Card.Text style={{ fontSize: '12px' }}>
                    {skill.skill_name}</Card.Text>
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