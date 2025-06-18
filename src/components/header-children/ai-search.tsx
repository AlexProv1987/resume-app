import { useState } from "react"
import { Form, Container, Row, Col, InputGroup } from "react-bootstrap"
import { CenteredSpinner } from "../common/centered-spinner"
import { axiosBaseURL } from "../../http"
import { DownloadResume } from "./download_resume"
interface SearchCompProps {
    applicant_id: string,
    applicant_name_first: string,
    banner_img: string,
}
//we need to check device for width needs to be 100% on mobile
export const SearchComponent = (props: SearchCompProps) => {
    const [inputVal, setInputVal] = useState<string>('')
    const [showError, setShowError] = useState(false)


    const submitQuestion = () => {
        if (inputVal.length < 45) {
            setShowError(true);
            return;
        }
        setShowError(false);
        setInputVal('')
        //submission logic here
        alert(inputVal);
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
                                        if (showError && e.target.value.length >= 45) {
                                            setShowError(false);
                                        }
                                    }}
                                    placeholder={`Ask about ${props.applicant_name_first}...`}
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
                                    Please enter at least 45 characters.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </>
                : <CenteredSpinner />}
        </Container>
    )
}