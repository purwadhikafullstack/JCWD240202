import { Modal, Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';

export default function ModalCancelOrder(props) {
    const dispatch = useDispatch();

    return (
        <Modal show={props?.state?.cancelOrder}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Are you sure want to cancel this order?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => {
                            props?.func?.handleCancelOrder();
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.state?.setCancelOrder(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
