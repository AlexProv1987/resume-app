import { ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Envelope, Telephone, Linkedin, Github, Briefcase, Mastodon, Signal, PersonArmsUp } from "react-bootstrap-icons";

interface iconObj {
  name: string;
  component: React.ElementType;
  getHref: (value: string) => string;
  renderWrapper?: (children: ReactNode, value: string, container?: HTMLElement | null) => ReactNode;
}

const contactIconMapArr: iconObj[] = [
  {
    name: "email",
    component: Envelope,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
    {
    name: "signal",
    component: Signal,
    getHref: (value: string) => `${value}`,
    renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "phone",
    component: Telephone,
    getHref: (value: string) => `tel:${value}`,
    renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "default",
    component: PersonArmsUp,
    getHref: (value: string) => value,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
];

export const getContactIcon = (type: string): iconObj => {
  return contactIconMapArr.find((icon) => icon.name === type) ||
    contactIconMapArr.find((icon) => icon.name === "default")!;
};


export const socialIconMapArr: iconObj[] = [
  {
    name: "linkdin",
    component: Linkedin,
    getHref: (value: string) => `${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "twitter",
    component: Linkedin,
    getHref: (value: string) => `${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "github",
    component: Github,
    getHref: (value: string) => `${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "portfolio",
    component: Briefcase,
    getHref: (value: string) => `${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "mastodon",
    component: Mastodon,
    getHref: (value: string) => `${value}`,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "default",
    component: PersonArmsUp,
    getHref: (value: string) => value,
     renderWrapper: (children, value,container) => (
      <OverlayTrigger  containerPadding={10} placement="top" overlay={<Tooltip>{value}</Tooltip>} container={container}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
];

export const getSocialIcon = (type: string): iconObj => {
  return socialIconMapArr.find((icon) => icon.name === type) ||
    socialIconMapArr.find((icon) => icon.name === "default")!;
};