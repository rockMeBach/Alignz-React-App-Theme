import React from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";

class UIModalComponent extends React.Component {
  render() {
    const { title, bodyText, onClose, onSave, size, show,footerContent,closeButtonVariant,saveButtonVariant,closeButtonContent,saveButtonContent } = this.props;
    return (
      <Modal size={size} show={show} onHide={onClose}>
        <Modal.Header closeButton>
          {title}
        </Modal.Header>

        <Modal.Body>
          <p>{bodyText}</p>
        </Modal.Body>

        <Modal.Footer>
          {footerContent}
          <Button variant={saveButtonVariant} onClick={onSave}>
            {saveButtonContent}
          </Button>
          <Button variant={closeButtonVariant} onClick={onClose}>
            {closeButtonContent}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(UIModalComponent);
