import { Modal, Button } from 'flowbite-react';

export default function ModalDeleteReview(props) {
    return (
        <Modal show={props?.state?.deleteModal}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Are you sure want to delete this review?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => {
                            props?.func?.deleteReview();
                            props?.state?.setDeleteModal(false);
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.state?.setDeleteModal(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
