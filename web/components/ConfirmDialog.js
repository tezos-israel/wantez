import React, { useState } from "react";
import PropTypes from "prop-types";

export function ConfirmDialog({ isOpen, onOk, onCancel }) {
  return (
    <div open={isOpen}>
      <div>Are you sure?</div>
      <div>
        <button type="button" autoFocus onClick={onCancel} color="primary">
          Cancel
        </button>
        <button type="button" onClick={onOk} color="primary">
          Ok
        </button>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, toggle };

  function toggle() {
    setIsOpen(!isOpen);
  }
}
