import { Card, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useEffect, useRef, useState } from "react"
import { axiosBaseURL } from "../http"
import { applicant } from "../common/constants"
import { CenteredSpinner } from "./common/centered-spinner"
import { isMobile } from "react-device-detect"
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons"
interface Skill {
  id: string,
  skill_name: string,
  skill_description: string,
  years_of_experience: number,
  skill_logo: string,
}
export const Skills = () => {
  const [skills, setSkills] = useState<Skill[] | null>(null)
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null)
  const MAX_VISIBLE = 4

  useEffect(() => {
    axiosBaseURL.get(`details/skills/?applicant=${applicant}`)
      .then(function (response) {
        setSkills(response.data)
      })
      .catch(function (error) {
        console.error(`Error Fetching Skills: ${error}`)
      });

  }, []);

  if (skills && skills.length === 0) {
    return null;
  }

  return (
    <Card className="shadow card-accent teal" style={{ width: `${isMobile ? '95%' : '20rem'}`, marginBottom: '1rem' }}>
      <Card.Header className="text-secondary-emphasis">
        <Row>
          <Col>
            Skills
          </Col>
          <Col>
            {skills && skills.length > MAX_VISIBLE && (
              <div className="text-end pb-1">
                {expanded ? (
                  <CaretUpFill role="button" color='teal' size={20} onClick={() => setExpanded(false)} />
                ) : (
                  <CaretDownFill role="button" color='teal' size={20} onClick={() => setExpanded(true)} />
                )}
              </div>
            )}
          </Col>
        </Row>
      </Card.Header>
      {skills ? (
        <Card.Body>
          <Row ref={containerRef}>
            {(expanded ? skills : skills.slice(0, MAX_VISIBLE)).map((skill) => (
              <Col xs={3} md={3} lg={3} className="pb-3 text-center" key={skill.id}>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {skill.skill_name} - {skill.years_of_experience} Yrs. Experience
                    </Tooltip>
                  }
                  container={containerRef.current}
                >
                  <Card.Img
                    variant="top"
                    style={{ maxHeight: "40px", maxWidth: "40px" }}
                    src={skill.skill_logo ? skill.skill_logo : 'default_skill.jpg'}
                  />
                </OverlayTrigger>
              </Col>
            ))}
          </Row>
        </Card.Body>
      ) : (
        <CenteredSpinner />
      )}
    </Card>
  );
}