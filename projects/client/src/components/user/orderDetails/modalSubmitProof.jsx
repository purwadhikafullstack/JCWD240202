import { Modal, Button } from 'flowbite-react';

export default function ModalSubmitProof(props) {
    return (
        <Modal show={props?.state?.modalSubmitProof}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Remove Image?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => {
                            props?.func?.uploadProof({
                                images: props?.data?.images,
                                order_id: props?.data?.order_id,
                            });
                            props?.state?.setModalSubmitProof(false);
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.state?.setModalSubmitProof(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
