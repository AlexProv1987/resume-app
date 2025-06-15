import { Container, Row, Col, Navbar, Button, Nav } from 'react-bootstrap';
import './App.css';
import { Header } from './components/header';
import { JobHistory } from './components/job-history';
import { Skills } from './components/skills';
import { EducationHistory } from './components/education';
import { References } from './components/references';
import { Projects } from './components/projects';
import { SocialIcon } from 'react-social-icons'
import React, { useState } from 'react';
import { Certifications } from './components/certifications';

function App() {
  return (
    <Container className='bg-light' fluid style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0,
    }}>
      <Header />
      <Container style={{ flex: 1, marginTop: '2rem' }}>
        <Row className='justify-content-center'>
          <Col md={8} >
            <JobHistory />
            <Projects />
          </Col>
          <Col md={4}>
            <Certifications />
            <Skills />
            <EducationHistory />
            <References />
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      </Container>
      <Navbar className="navbar-dark bg-dark">
        <SocialIcon network='linkedin' style={{ marginLeft: '.5rem' }} />
        <SocialIcon network="twitter" bgColor="#ff5a01" style={{ marginLeft: '.5rem' }} />
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="m-2">
            <Button size="sm" type="button">Contact Me!</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default App;
