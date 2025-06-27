import { Container, Row, Col, Alert } from 'react-bootstrap';
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
import { applicant } from './constants';
import { ApplicantRecord } from './common/interfaces';
import { BioComponent } from './components/bio';
function App() {

  const [applicantData, setApplicantData] = useState<ApplicantRecord | null>(null)
  const [alertMsg, setAlertMsg] = useState<string>('')
  
  useEffect(() => {
    axiosBaseURL.get(`applicant/get_applicant_data/${applicant}`)
      .then(function (response) {
        setApplicantData(response.data)
      })
      .catch(function (error) {
        if (error.status === 404) {
          setAlertMsg('Applicant does not exist.')
        } else {
          setAlertMsg('The server has gone to sleep it appears...please try again later.')
        }
      });
  }, []);

  return (
    <Container className='bg-light' fluid style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      {alertMsg &&
        <Alert
          dismissible
          variant='danger'
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            zIndex: 1060,
            borderRadius: 0,
          }}
        >
          {alertMsg}
        </Alert>
      }
      <Header applicantData={applicantData ? applicantData : null} />
      <Container style={{paddingLeft:'1.5rem',paddingRight:isMobile ? '1.5rem' : '1rem'}}>
      <BioComponent applicantData={applicantData}/>
      </Container>
      <Container style={{ flex: 1, marginTop: '2rem', }}>
        <Row>
          <Col lg={9}>
            <JobHistory />
            <hr className="my-2" style={{ borderColor: '#eee' }} />
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
      <FeedbackModalButton
        first_name={applicantData?.user_reltn.first_name}
      />
      <Footer
        contact_methods={applicantData?.contact_method ? applicantData.contact_method : []}
        social={applicantData?.social ? applicantData.social : []}
      />
    </Container>
  );
}

export default App;
