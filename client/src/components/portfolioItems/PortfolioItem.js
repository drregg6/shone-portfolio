import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  const image = props.item.image;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <img src={image} />
      </Modal.Body>
    </Modal>
  );
}

const PortfolioItem = ({
  item
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <img className="portfolio-item-image" src={item.image} onClick={() => setModalShow(true)} />

      <MyVerticallyCenteredModal
        show={modalShow}
        item={item}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}

PortfolioItem.propTypes = {
  item: PropTypes.object
}

export default PortfolioItem;