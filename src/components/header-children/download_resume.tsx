import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { Download } from "react-bootstrap-icons"
import { axiosBaseURL } from "../../http";
import { useState } from "react";

interface Props {
    applicant: string,
}

export const DownloadResume = (props: Props) => {
    const [hasResume, setHasResume] = useState<boolean>(false)

    const getResume = () => {
        if (hasResume) {
            return;
        }
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
            })
            .catch((error) => {
                console.error('Error Getting Resume:', error);
            });
    }
    return (
        <div
            style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                marginRight:'1rem',
                zIndex: 10,
                cursor: hasResume ? 'not-allowed' : 'pointer',
            }}
        >
            <OverlayTrigger
                placement="left"
                overlay={<Tooltip>{hasResume ? "You already have this resume." : "Download Resume."}</Tooltip>}>
                <Download onClick={()=>getResume()} size={24} color="red" />
            </OverlayTrigger>
        </div>
    )
}