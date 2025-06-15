import { Card } from "react-bootstrap"
import { useEffect, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
interface Skill {
  id: string,
  skill_name: string,
  skill_description: string,
  years_of_experience: number,
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
    <Card style={{ width: '20rem', marginBottom: '1rem' }}>
      <Card.Header>Skills</Card.Header>
      {skills ?
        <Card.Body>
          {skills.map(function (skill: Skill) {
            return (
              <div className="border-bottom pb-1" key={skill.id}>
                <Card.Text>{skill.skill_name}</Card.Text>
                <Card.Text>{`Experience: ${skill.years_of_experience} Years.`}</Card.Text>
              </div>
            )
          })}
        </Card.Body>
        : <CenteredSpinner />
      }
    </Card>
  );
}
