import { ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Envelope, Telephone, PersonLinesFill, Linkedin, Twitter, Github, Briefcase, Mastodon, Signal, PersonArmsUp } from "react-bootstrap-icons";

interface iconObj {
  name: string;
  component: React.ElementType;
  getHref: (value: string) => string;
  renderWrapper?: (children: ReactNode, value: string) => ReactNode;
}

const contactIconMapArr: iconObj[] = [
  {
    name: "email",
    component: Envelope,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
    {
    name: "signal",
    component: Signal,
    getHref: (value: string) => `mailto:${value}`,
    renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "phone",
    component: Telephone,
    getHref: (value: string) => `tel:${value}`,
    renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "default",
    component: PersonArmsUp,
    getHref: (value: string) => value,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
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
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "twitter",
    component: Linkedin,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "github",
    component: Github,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "portfolio",
    component: Briefcase,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "mastodon",
    component: Mastodon,
    getHref: (value: string) => `mailto:${value}`,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "default",
    component: PersonArmsUp,
    getHref: (value: string) => value,
     renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={() => document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
];

export const getSocialIcon = (type: string): iconObj => {
  return socialIconMapArr.find((icon) => icon.name === type) ||
    socialIconMapArr.find((icon) => icon.name === "default")!;
};