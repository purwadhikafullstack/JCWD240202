import { Modal } from 'flowbite-react';

export default function ModalLogout(props) {
    return (
        <Modal
            dismissible
            className="z-[999]"
            show={props?.data?.openModal}
            onClose={() => props?.data?.setOpenModal(false)}
        >
            <Modal.Body>
                <div className="text-lg flex justify-center items-center">
                    Are you sure want to log out?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-center gap-9 w-full">
                    <button
                        className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => {
                            props?.data?.logout();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => props?.data?.setOpenModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
