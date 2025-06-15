import { useState } from "react"
import { Form, Container } from "react-bootstrap"
import { CenteredSpinner } from "../common/centered-spinner"

interface SearchCompProps {
    applicant_id: string,
    applicant_name_first: string,
    banner_img: string,
}
//we need to check device for width needs to be 100% on mobile
export const SearchComponent = (props: SearchCompProps) => {
    const [inputVal, setInputVal] = useState<string>('')
    return (
        <Container
            fluid
            style={{
                backgroundImage: `url("${props.banner_img}")`,
                minHeight: '200px',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {props.applicant_name_first !== 'undefined' ?
                <Form.Control
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={`Ask about ${props.applicant_name_first}...`}
                    style={{
                        width: '50%',
                        borderRadius: '8px',
                    }}
                />
                : <CenteredSpinner />}
        </Container>
    )
}