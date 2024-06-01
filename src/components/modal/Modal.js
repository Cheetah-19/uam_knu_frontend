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
            <button id="modalCloseBtn" onClick={closeModal}>
                ✖
            </button>
            {props.children}
            {props.modaltype === 'addVertiport' &&
                <div>
                    <AddVertiport constants={props.constants} vertiports={props.vertiports} closeModal={closeModal}></AddVertiport>
                </div>
            }
            </div>
        </div>
    );

}

export default Modal;