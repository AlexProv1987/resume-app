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
import { isMobile } from 'react-device-detect';
import { FeedbackModalButton } from './components/feedback';

function App() {
  console.log('app render')
  return (
    <Container className='bg-light' fluid style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      <Header />
      <Container style={{ flex: 1, marginTop: '2rem',}}>
        <Row>
          <Col lg={8}>
            <JobHistory />
            <Projects />
          </Col>
          <Col lg={4} className='d-flex flex-column align-items-end'>
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
