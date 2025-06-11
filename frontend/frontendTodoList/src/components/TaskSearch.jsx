import React from 'react';

function TaskSearch() {
  return (
    <div className="slds-form-element slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3">
      <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left-right">
        {/* Search Icon goes here if using SLDS icons */}
        <input type="text" className="slds-input" placeholder="Search" /> 
        <span className="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_right">
          {/* Actual search icon */}
        </span>
      </div>
    </div>
  );
}

export default TaskSearch;