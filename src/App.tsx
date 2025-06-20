import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { Header } from './components/header';
import { JobHistory } from './components/job-history';
import { Skills } from './components/skills';
import { EducationHistory } from './components/education';
import { References } from './components/references';
import { Projects } from './components/projects';
import { Certifications } from './components/certifications';
import { Footer } from './components/footer';
import { FeedbackModalButton } from './components/feedback';
import { useEffect, useState } from 'react';
import { Awards } from './components/awards';
import { isMobile } from 'react-device-detect';
import { axiosBaseURL } from './http';
import { applicant } from './common/constants';
import { ApplicantRecord } from './common/interfaces';
function App() {

  const [applicantData, setApplicantData] = useState<ApplicantRecord | null>(null)

  useEffect(() => {
    axiosBaseURL.get(`applicant/get_applicant/${applicant}`)
      .then(function (response) {
        console.log(response.data)
        setApplicantData(response.data)
      })
      .catch(function (error) {
        console.error(error)
      });
  }, []);
  console.log('render me daddy')
  return (
    <Container className='bg-light' fluid style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      <Header applicantData={applicantData ? applicantData : null} />
      <Container style={{ flex: 1, marginTop: '2rem', }}>
        <Row>
          <Col lg={9}>
            <JobHistory />
            <hr className="my-4" style={{ borderColor: '#eee' }} />
            <Projects />
          </Col>
          <Col lg={3} className={`d-flex flex-column ${isMobile ? 'align-items-center' : 'align-items-end'}`}>
            <Awards />
            <Certifications />
            <Skills />
            <EducationHistory />
            <References />
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      </Container>
      <FeedbackModalButton />
      <Footer />
    </Container>
  );
}

export default App;
