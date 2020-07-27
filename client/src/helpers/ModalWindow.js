import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalWindow(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Start from the beggining
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.setIsAgreed(true);
              handleClose();
            }}
          >
            Continue reading
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;
