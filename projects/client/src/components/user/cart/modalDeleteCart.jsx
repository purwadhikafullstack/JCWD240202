import { Button, Modal } from 'flowbite-react';

export default function ModalDeleteCart(props) {
    return (
        <Modal show={props?.data?.show}>
            <Modal.Body>
                <div className="text-2xl flex justify-center items-center">
                    Remove product from cart?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 w-full flex justify-center items-center">
                    <div>
                        <Button
                            onClick={() => {
                                props?.data?.deleteProductFromCart();
                                props?.data?.setModalDelete(false);
                            }}
                            className="bg-sky-700 text-yellow-200"
                        >
                            Confirm
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={() => props?.data?.setModalDelete(false)}
                            color={'failure'}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
