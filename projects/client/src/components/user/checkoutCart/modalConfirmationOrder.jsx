import { Button, Modal } from 'flowbite-react';

export default function ModalConfirmationOrder(props) {
    return (
        <Modal show={props?.data?.modalConfirmation}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Confirm Order?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => {
                            props?.data?.submitOrder();
                            props?.data?.setModalConfirmation(false);
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.data?.setModalConfirmation(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
