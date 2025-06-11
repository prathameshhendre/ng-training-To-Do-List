import React from 'react';

function Pagination({ totalRecords }) { // Receives totalRecords as a prop
  return (
    <div className="slds-grid slds-grid_align-spread slds-m-top_medium">
      <p className="slds-text-body_small slds-align-middle">{totalRecords} records</p> {/* Use totalRecords */}
      <nav aria-label="Pagination">
        <button className="slds-button slds-button_neutral" disabled>First</button>
        <button className="slds-button slds-button_neutral" disabled>&lt; Prev</button>
        <span className="slds-text-body_small slds-m-horizontal_x-small slds-align-middle">1</span>
        <button className="slds-button slds-button_neutral">Next &gt;</button>
        <button className="slds-button slds-button_neutral">Last</button>
      </nav>
    </div>
  );
}

export default Pagination;
