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
  checkIcon,
  cancelIcon,
  moonIcon,
  sunIcon,
  refreshIcon,
  eyeIcon,
  barIcon,
} from "./icons";

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

export const PlusIcon = ({ text, ...props }) => {
  return tooltip(text ? text : "New", plusIcon(props));
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

export const CheckIcon = (props) => {
  return tooltip("Save", checkIcon(props));
};

export const CancelIcon = (props) => {
  return tooltip("Cancel", cancelIcon(props));
};

export const MoonIcon = (props) => {
  return moonIcon(props);
};

export const SunIcon = (props) => {
  return sunIcon(props);
};

export const RefreshIcon = (props) => {
  return tooltip("Refresh", refreshIcon(props));
};

export const EyeIcon = ({tooltipTxt, ...props}) => {
  return tooltip(tooltipTxt ? tooltipTxt : "No Show", eyeIcon(props));
};

export const BarIcon = ({tooltipTxt, ...props}) => {
  return tooltip(tooltipTxt ? tooltipTxt : "Write Report", barIcon(props));
};
