import React from "react";
import PropTypes from "prop-types";
import "./modal.scss";

export const Modal = ({ isActive, id, children }) => {
  return (
    <div id={id} className={`modal ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  isActive: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = ({ onClose, children }) => {
  return (
    <div className="modal__content">
      {children ? children : "No Content"}
      <div className="modal__content--close" onClick={onClose}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};
