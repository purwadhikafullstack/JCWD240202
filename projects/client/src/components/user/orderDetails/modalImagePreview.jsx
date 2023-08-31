import { Modal } from 'flowbite-react';

export default function ModalImagePreview(props) {
    return (
        <>
            <Modal
                show={props?.state?.modalImage}
                onClose={() => props?.state?.setModalImage(false)}
            >
                <Modal.Header>
                    <div>Payment Proof</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="h-[600px] w-full flex items-center justify-center">
                        <img
                            src={props?.data?.imagePreview[0]}
                            alt="image_preview"
                            className="h-[600px] w-full"
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
