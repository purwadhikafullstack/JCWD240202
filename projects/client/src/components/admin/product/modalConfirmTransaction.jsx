import { Modal } from 'flowbite-react';
import { Toaster } from 'react-hot-toast';

export default function ModalConfirmTransaction(props) {
    return (
        <>
            <Toaster />
            <Modal
                dismissible
                show={props.data?.showConfirm}
                onClose={() => props.data?.setShowConfirm(false)}
            >
                <Modal.Body>
                    <div>
                        Are you sure? 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => { props.handleConfirm(); props.data?.setShowConfirm(false)}}
                    >
                        Continue
                    </button>
                    <button
                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => props.data?.setShowConfirm(false)}
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}