import { useState } from "react"
import { Form, Container, Row, Col, Modal, Button} from "react-bootstrap"
import { CenteredSpinner } from "../common/centered-spinner"
import { axiosBaseURL } from "../../http"
import { DownloadResume } from "./download_resume"
import { BouncingDotsLoader } from "../common/bouncing-loader"
import { applicant } from "../../common/constants"
interface SearchCompProps {
    applicant_id: string,
    applicant_name_first: string,
    banner_img: string,
}
//we need to check device for width needs to be 100% on mobile
export const SearchComponent = (props: SearchCompProps) => {

    const [show, setShow] = useState<boolean>(false)
    const [inputVal, setInputVal] = useState<string>('')
    const [showError, setShowError] = useState(false)
    const [answer, setAnswer] = useState<string>('')

    const submitQuestion = () => {
        if (inputVal.length < 25) {
            setShowError(true);
            return;
        }

        setShow(true);

        axiosBaseURL.post('question/ask/', {
            applicant: applicant,
            question: inputVal,
        }).then(function (response) {
            setAnswer(response.data.answer)
        }).catch(function (error) {
            setAnswer('It appears our overlord is having issues today. Please try again later.')
        }).finally(function () {
            //..
        })
    }

    return (
        <Container
            fluid
            style={{
                backgroundImage: `url("${props.banner_img}")`,
                minHeight: '200px',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {props.applicant_name_first !== 'undefined' ?
                <>
                    <DownloadResume applicant={props.applicant_id} />
                    <Row className="w-100 justify-content-center px-3">
                        <Col xs={12} sm={10} md={8} lg={6}>
                                <Form.Group controlId="questionInput">
                                    <Form.Control
                                        className="ask-input"
                                        type="text"
                                        value={inputVal}
                                        onChange={(e) => {
                                            setInputVal(e.target.value);
                                            if (showError && e.target.value.length >= 25) {
                                                setShowError(false);
                                            }
                                        }}
                                        placeholder={`Ask about ${props.applicant_name_first}’s relevance to the role...`}
                                        isInvalid={showError}
                                        maxLength={1000}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                submitQuestion();
                                            }
                                        }}
                                        style={{
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter at least 25 characters.
                                    </Form.Control.Feedback>
                                </Form.Group>
                        </Col>
                    </Row>
                </>
                : <CenteredSpinner />}
            <Modal size="lg" show={show} onHide={() => { 
                                                    setShow(false);
                                                    setInputVal('');
                                                    setAnswer('');
                                                }} 
                                                centered>
                <div className="card-carousel">
                    <Modal.Header closeButton className="card-section-title">
                        <Modal.Title>Applicant Insights</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {answer !== '' ?
                            <p className="fade-in-up" style={{ fontSize: '1rem', lineHeight: '1.65', textAlign: 'left', whiteSpace: 'pre-line' }}>{answer}</p>
                            :
                            <BouncingDotsLoader />}
                    </Modal.Body>
                    <Modal.Footer className="card-section-title">
                        <Button className="custom-cancel" variant="secondary" size="sm" onClick={() => { setShow(false); setInputVal(''); setAnswer(''); }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    )
}