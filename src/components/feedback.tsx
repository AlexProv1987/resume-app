import { useRef, useState } from "react";
import { Modal, Button, Form, ModalBody, Alert } from "react-bootstrap";
import { Star, StarFill, ChatDots, PencilFill, ChatLeftDots, ChatText } from "react-bootstrap-icons";
import Rating from "react-rating";
import { applicant } from "../common/constants";


export function FeedbackModalButton() {

    const [show, setShow] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [comment, setComment] = useState<string>("")

    const didSubmit = useRef<boolean>(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({ rating, comment })
        didSubmit.current = true
        setShow(false)
        setRating(0)
        setComment("")
    };

    return (
        <>
            {didSubmit.current &&
                <Alert
                    dismissible
                    variant="success"
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 1060,
                        borderRadius: 0,
                    }}
                >
                Feedback Submitted! Thank You!
                </Alert>
            }
            <Button
                onClick={() => setShow(true)}
                className="rounded-circle shadow"
                style={{
                    borderColor: "#009688",
                    backgroundColor: "#009688",
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
                <Modal.Header closeButton className="bg-light">
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
                                <Form.Label>Comment (optional)</Form.Label>
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
                    <Modal.Footer className="bg-light">
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={(rating === 0 || didSubmit.current)}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
