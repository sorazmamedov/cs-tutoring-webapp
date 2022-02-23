import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  editIcon,
  deleteIcon,
  toggleIcon,
  megaphoneIcon,
  plusIcon,
  arrowUpIcon,
  personIcon,
  menuIcon,
} from "./Icons";

const tooltip = (text, fn) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
    {fn}
  </OverlayTrigger>
);

export const EditIcon = (props) => {
  return tooltip("Edit", editIcon(props));
};

export const DeleteIcon = (props) => {
  return tooltip("Delete", deleteIcon(props));
};

export const SwitchIcon = (props) => {
  return tooltip(props.checked ? "Deactivate" : "Activate", toggleIcon(props));
};

export const MegaphoneIcon = (props) => {
  return tooltip("New Announcement", megaphoneIcon(props));
};

export const PlusIcon = (props) => {
  return tooltip("New", plusIcon(props));
};

export const ArrowUpIcon = (props) => {
  return tooltip("Go Up", arrowUpIcon(props));
};

export const PersonIcon = ({ style }) => {
  return tooltip("Picture Placeholder", personIcon(style));
};

export const MenuIcon = (props) => {
  return tooltip("Menu", menuIcon(props));
};
