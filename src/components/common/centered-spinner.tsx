import { Container, Spinner } from "react-bootstrap"

export const CenteredSpinner = () => {
    return (
        <Container style={{
            minHeight: '200px', display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    )
}
