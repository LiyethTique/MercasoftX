import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalForm = ({ isOpen, onClose, title, children, onSubmit, buttonText }) => {
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
        {onSubmit && (
          <Button variant="primary" onClick={onSubmit}>
            {buttonText || 'Guardar'}
          </Button>
        )}
      
    </Modal>
  );
};

export default ModalForm;
