import { Envelope, Github, Linkedin, Telephone } from "react-bootstrap-icons";
import { ContactMethod, Social } from "../common/interfaces";
import { useEffect, useRef } from "react";
import { getContactIcon, getSocialIcon } from "../common/icon-maps";
import { Col } from "react-bootstrap";
interface Props {
  contact_methods: ContactMethod[],
  social: Social[],
}
export const Footer = (props: Props) => {

  const footerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

  }, [props.social, props.contact_methods]);

  return (
    <div className="custom-footer">
      <span className="footer-name">© 2025 AP</span>
      <div className="footer-icons d-flex flex-row-reverse" ref={footerContainerRef}>
        {props?.social?.length !== 0 &&
          props.social.map((social: Social, idx: number) => {

            const iconConfig = getSocialIcon(social.platform);

            const IconComponent = iconConfig.component;
            const href = iconConfig.getHref(social.url);

            const iconElement = (
              <a href={href} target="_blank" rel="noreferrer">
                <IconComponent size={20} color="white" />
              </a>
            );

            const wrapped = iconConfig.renderWrapper
              ? iconConfig.renderWrapper(iconElement, social.platform, footerContainerRef.current)
              : iconElement;
            return (
              <Col xs="auto" key={idx}>
                {wrapped}
              </Col>
            );
          })}
        {props?.contact_methods?.length !== 0 &&
          props.contact_methods.map((contact: ContactMethod, idx: number) => {

            const iconConfig = getContactIcon(contact.contact_type);

            const IconComponent = iconConfig.component;
            const href = iconConfig.getHref(contact.value);

            const iconElement = (
              <a href={href} target="_blank" rel="noreferrer">
                <IconComponent size={20} color="white" />
              </a>
            );

            const wrapped = iconConfig.renderWrapper
              ? iconConfig.renderWrapper(iconElement, contact.value)
              : iconElement;

            return (
              <Col xs="auto" key={idx}>
                {wrapped}
              </Col>
            );
          })}
      </div>
    </div>
  );
}