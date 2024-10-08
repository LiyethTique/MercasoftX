import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalForm = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      backdrop="static"  // Evita que se cierre al hacer clic fuera del modal
      keyboard={false}   // Evita que se cierre al presionar la tecla 'Esc'
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalForm;