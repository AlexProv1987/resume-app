import { ReactNode } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Envelope, Telephone, PersonLinesFill } from "react-bootstrap-icons";

interface iconObj {
  name: string;
  component: React.ElementType;
  getHref: (value: string) => string;
  renderWrapper?: (children: ReactNode, value: string) => ReactNode;
}

export const contactIconMapArr: iconObj[] = [
  {
    name: "email",
    component: Envelope,
    getHref: (value: string) => `mailto:${value}`,
  },
  {
    name: "phone",
    component: Telephone,
    getHref: (value: string) => `tel:${value}`,
    renderWrapper: (children, value) => (
      <OverlayTrigger placement="top" overlay={<Tooltip>{value}</Tooltip>} container={()=>document.body}>
        {children as React.ReactElement}
      </OverlayTrigger>
    ),
  },
  {
    name: "default",
    component: PersonLinesFill,
    getHref: (value: string) => value,
  },
];

export const getContactIcon = (type: string): iconObj => {
  return contactIconMapArr.find((icon) => icon.name === type) ||
         contactIconMapArr.find((icon) => icon.name === "default")!;
};