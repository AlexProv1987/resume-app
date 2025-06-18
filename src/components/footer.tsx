import { Envelope, Github, Linkedin, Telephone } from "react-bootstrap-icons";

export const Footer = () => {
   return (
    <div className="custom-footer">
      <span className="footer-name">© 2025 AP</span>
      <div className="footer-icons">
        <a href={"https://www.linkedin.com/in/your-profile"} target="_blank" rel="noopener noreferrer">
          <Linkedin size={20} />
        </a>
        <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
          <Github size={20} />
        </a>
        <a href="tel:+11234567890">
          <Telephone size={20} />
        </a>
        <a href="mailto:you@example.com">
          <Envelope size={20} />
        </a>
      </div>
    </div>
  );
}