import React from 'react';
import {Modal} from 'react-bootstrap';


const DetailModal = ({showState, detail, handleClose}) => {
    return (
        <Modal dialogClassName='modal-90h' centered show={showState} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title> Details </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detail}
            </Modal.Body>
            <Modal.Footer>
                <button onClick={handleClose} className="btn-danger p-1 border-0 rounded-3 px-4" >Close</button>
            </Modal.Footer>
        </Modal>
    )

}


export default DetailModal;