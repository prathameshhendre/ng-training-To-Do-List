import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ show, title, onClose, children }) {
  if (!show) {
    return null;
  }

  // Render the modal outside the main app DOM tree for better z-index management
  return ReactDOM.createPortal(
    <div className="slds-scope">
      <section className="slds-modal slds-fade-in-open">
        <div className="slds-modal__container">
          <header className="slds-modal__header">
            <button className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onClick={onClose}>
              {/* SLDS Close Icon */}
              <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
                {/* <use xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"></use> */}
              </svg>
              <span className="slds-assistive-text">Close</span>
            </button>
            <h2 className="slds-modal__title slds-hyphenate">{title}</h2>
          </header>
          <div className="slds-modal__content slds-p-around_medium">
            {children}
          </div>
        </div>
      </section>
      <div className="slds-backdrop slds-backdrop_open"></div>
    </div>,
    document.getElementById('modal-root') // This element needs to be in your public/index.html
  );
}

export default Modal;