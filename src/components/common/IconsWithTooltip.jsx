import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
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
} from "./Icons";

const tooltip = (text, fn) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
    {fn}
  </OverlayTrigger>
);
const IconTooltip = ({text, children}) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>{text}</Tooltip>}>
    {children}
  </OverlayTrigger>
);

export const EditIcon = ({ sourceId, onEdit }) => {
  return tooltip("Edit", editIcon(sourceId, onEdit));
};

export const DeleteIcon = ({ sourceId, onDelete }) => {
  return tooltip("Delete", deleteIcon(sourceId, onDelete));
};

export const SwitchIcon = ({ isActive, ...props }) => {
  return tooltip("Deactivate", toggleIcon(props));
};

export const MegaphoneIcon = () => {
  return tooltip("New Announcement", megaphoneIcon());
};

export const PlusIcon = () => {
  return tooltip("New", plusIcon());
};

export const ArrowUpIcon = () => {
  return tooltip("Go Up", arrowUpIcon());
};

export const PersonIcon = ({ style }) => {
  return tooltip("Picture Placeholder", personIcon(style));
};
