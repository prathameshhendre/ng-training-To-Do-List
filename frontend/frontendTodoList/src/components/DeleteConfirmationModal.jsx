import React from 'react';
import Modal from './Modal.jsx'; // Corrected path

function DeleteConfirmationModal({ show, taskName, onConfirm, onCancel }) {
  return (
    <Modal show={show} title="Delete" onClose={onCancel}>
      <p className="slds-text-align_center slds-text-heading_small slds-m-bottom_medium">Do you want to delete task ({taskName})?</p>
      <div className="slds-grid slds-grid_align-center slds-m-top_large">
        <button className="slds-button slds-button_neutral slds-m-right_small" onClick={onCancel}>No</button>
        <button className="slds-button slds-button_brand" onClick={onConfirm}>Yes</button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
