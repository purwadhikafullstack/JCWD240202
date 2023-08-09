import { Modal, Button } from 'flowbite-react';

export default function ModalConfirmOrder(props) {
    return (
        <Modal show={props?.state?.modalConfirm}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Confirm you have received the order?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => props?.func?.handleConfirmOrder()}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.state?.setModalConfirm(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
