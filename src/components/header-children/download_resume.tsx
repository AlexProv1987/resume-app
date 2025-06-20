import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Download } from "react-bootstrap-icons"
import { axiosBaseURL } from "../../http";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    applicant: string,
}

export const DownloadResume = (props: Props) => {
    const [hasResume, setHasResume] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alertObj,setAlertObj] = useState<{ msg: string; variant: 'success' | 'danger' | 'warning' }>({msg:'',variant:'success'})

    const getResume = () => {
        if (hasResume) {
            return;
        }
        setIsLoading(true)
        axiosBaseURL
            .get(`applicant/get_resume/${props.applicant}`, {
                responseType: 'blob',
            })
            .then((response) => {
                setHasResume(true)
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                const link = document.createElement('a');
                link.href = fileURL;
                link.download = 'resume.pdf';
                link.click();
                setAlertObj({msg:'Resume is available now in your downloads!',variant:'success'})
            })
            .catch((error) => {
                setAlertObj({msg:'There was an error processing your request',variant:'danger'})
            }).finally(function () {
                setIsLoading(false)
            });
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                marginRight: '1rem',
                zIndex: 10,
                cursor: hasResume ? 'not-allowed' : 'pointer',
            }}
        >
             {alertObj.msg &&
                <Alert
                    dismissible
                    variant={alertObj.variant}
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        zIndex: 1060,
                        borderRadius: 0,
                    }}
                >
                    {alertObj.msg}
                </Alert>
            }     
            {isLoading ? <Spinner animation='grow' variant="info"/> :
                <OverlayTrigger
                    placement="left"
                    overlay={<Tooltip>{hasResume ? "You already have this resume." : "Download Resume."}</Tooltip>}>
                    <Download onClick={() => getResume()} size={24} color="#6C63FF" />
                </OverlayTrigger>
            }
        </div>
    )
}