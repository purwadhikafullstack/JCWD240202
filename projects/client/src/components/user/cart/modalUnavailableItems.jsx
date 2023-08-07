import { Button, Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function ModalUnavailableItems(props) {
    const navigate = useNavigate();
    return (
        <Modal show={props?.data?.modalUnavailable}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    <div>Unavailable items will be removed from cart.</div>
                    <div>Continue?</div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-4 w-full flex justify-center items-center">
                    <Button
                        onClick={() => {
                            props?.data?.setModalUnavailable(false);
                            navigate('/cart/checkout');
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Continue
                    </Button>
                    <Button
                        color={'failure'}
                        onClick={() => props?.data?.setModalUnavailable(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
