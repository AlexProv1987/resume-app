import {Container, Alert } from "react-bootstrap"
import { useState } from "react"
import { applicant } from "../constants"
import { SearchComponent } from "./header-children/ai-search"
import { ApplicantRecord, } from "../common/interfaces"


interface Props {
    applicantData: ApplicantRecord | null,
}

export const Header = (props: Props) => {
    const [alertMsg, setAlertMsg] = useState<string | null>(null)

    return (
        <Container fluid='true'>
            {alertMsg &&
                <Alert
                    dismissible
                    variant="danger"
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
            <SearchComponent
                applicant_id={applicant}
                applicant_name_first={`${props.applicantData?.user_reltn.first_name}`}
                banner_img={props.applicantData?.banner_img ? props.applicantData.banner_img : 'default_banner.jpg'}
            />
        </Container>
    );
}
