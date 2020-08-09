import React, { useState } from "react";
import PropTypes from "prop-types";
import { Dialog, Button, DialogTitle, DialogActions } from "@material-ui/core";

export function ConfirmDialog({ isOpen, onOk, onCancel }) {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
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
