import "../../styles/Modals.css"
import AddVertiport from "./AddVertiport";
import React from 'react';

function Modal(props){    
    const closeModal = () => {
        props.closeModal();
    }
    
    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                {props.children}
                {props.modaltype === 'addVertiport' &&
                    <AddVertiport constants={props.constants} vertiports={props.vertiports} closeModal={closeModal} user={props.user} />
                }
                <button id="modalCloseBtn" onClick={closeModal}>
                    ✖
                </button>
            </div>
        </div>
    );
}

export default Modal;