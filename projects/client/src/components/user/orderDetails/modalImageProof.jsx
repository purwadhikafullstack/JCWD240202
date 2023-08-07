import { Modal } from 'flowbite-react';

export default function ModalImageProof(props) {
    return (
        <Modal
            show={props?.state?.modalImageProof}
            onClose={() => props?.state?.setModalImageProof(false)}
        >
            <Modal.Header>
                <div>Payment Proof</div>
            </Modal.Header>
            <Modal.Body>
                <div className="h-[600px] w-full flex items-center justify-center">
                    <img
                        src={`${props?.data?.imageProofView}`}
                        alt="image_preview"
                        className="h-[600px] w-full"
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
}
