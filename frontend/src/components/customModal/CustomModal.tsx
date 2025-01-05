import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useModal } from "../../context/ModalContext";

export default function CustomModal() {
    const {isModalOpen,  closeModal, modalContent, header, size} = useModal();

    if(!isModalOpen) return null;

    return (
        <Modal size={ size } show={isModalOpen} onHide={closeModal}>
            <ModalHeader closeButton>
                <ModalTitle>
                    { header }
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                { modalContent }
            </ModalBody>
        </Modal>
    )
}