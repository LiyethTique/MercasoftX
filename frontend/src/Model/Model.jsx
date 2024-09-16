import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalForm = ({ isOpen, onClose, title, children, onSubmit }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {title.includes('Actualizar') ? 'Actualizar' : 'Enviar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;