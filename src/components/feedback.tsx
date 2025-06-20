import { useRef, useState } from "react";
import { Modal, Button, Form, ModalBody, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Star, StarFill, ChatText, InfoCircle } from "react-bootstrap-icons";
import Rating from "react-rating";
import { applicant } from "../common/constants";
import { axiosBaseURL } from "../http";

export function FeedbackModalButton() {
    const [show, setShow] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>("")
    const [alertMsg,setAlertMsg] = useState<string | null>(null)
    const [alertVariant,setAlertVariant] = useState<string>('success')

    const didSubmit = useRef<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axiosBaseURL.post('feedback/create/',
            { applicant_reltn: applicant, rating: rating, comment: comment }
        ).then(function (response) {
            didSubmit.current = true
            setShow(false)
            setRating(0)
            setComment("")
            setAlertMsg('Thank you for your Feedback!')
            setAlertVariant('success')
        }).catch(function (error) {
            if(error.status === 400 || error.status === 429 ){
                didSubmit.current = true
                setAlertMsg(error.response.data.error)
                setAlertVariant('warning')
            }else{
                setAlertMsg('It appears something has catastrophically broke...')
                setAlertVariant('danger')
            }
        }).finally(function () {
            setShow(!show)
        })
    };

    return (
        <>
            {alertMsg &&
                <Alert
                    dismissible
                    variant={alertVariant}
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
            <Button
                onClick={() => setShow(true)}
                className="rounded-circle shadow fab-button"
                style={{
                    borderColor: "#6c63ff",
                    backgroundColor: "#6c63ff",
                    position: "fixed",
                    bottom: "60px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    zIndex: 1050,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ChatText size={26} color="white" />
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <div className="card-carousel">
                <Modal.Header closeButton className="card-section-title">
                    <Modal.Title>Leave Feedback</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                    {!didSubmit.current ?
                        <Modal.Body>
                            <div className="mb-3 text-center">
                                <Rating
                                    initialRating={rating}
                                    onChange={(value) => setRating(value)}
                                    emptySymbol={<Star size={32} color="#ccc" />}
                                    fullSymbol={<StarFill size={32} color="#f5c518" />}
                                />
                            </div>
                            <Form.Group>
                                <Form.Label>
                                    Comment
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={<Tooltip>Optional field — leave blank if not applicable</Tooltip>}>
                                        <InfoCircle className="text-muted" style={{ cursor: 'pointer', marginLeft: '2px' }} />
                                    </OverlayTrigger>
                                </Form.Label>
                                <Form.Control
                                    disabled={didSubmit.current ? true : false}
                                    as="textarea"
                                    rows={3}
                                    placeholder="Let me know what you think..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Form.Group>
                        </Modal.Body>
                        : <ModalBody>We Appreciate your feedback!</ModalBody>}
                    <Modal.Footer className="card-section-title">
                        <Button className="custom-cancel" variant="secondary" size="sm" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button className="custom-submit" size="sm" type="submit" disabled={(rating === 0 || didSubmit.current)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
                </div>
            </Modal>
        </>
    );
}
