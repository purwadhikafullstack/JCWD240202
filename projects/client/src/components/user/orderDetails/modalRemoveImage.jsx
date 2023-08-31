import { Button, Modal } from 'flowbite-react';

export default function ModalRemoveImage(props) {
    return (
        <>
            <Modal show={props?.state?.modalRemoveImage}>
                <Modal.Body>
                    <div className="text-xl font-bold flex justify-center items-center">
                        Remove Image?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex gap-9 justify-center items-center w-full">
                        <Button
                            onClick={() => {
                                props?.state?.setImageProof([]);
                                props?.state?.setImagePreview([]);
                                props?.state?.setModalRemoveImage(false);
                            }}
                            className="bg-sky-700 text-yellow-200"
                        >
                            Confirm
                        </Button>
                        <Button
                            onClick={() =>
                                props?.state?.setModalRemoveImage(false)
                            }
                            color={'failure'}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
