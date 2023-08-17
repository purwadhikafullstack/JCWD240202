import { Modal, Button } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { removeWishlistAsync } from '../../../redux/features/wishlistSlice';

export default function ModalRemoveWishlist(props) {
    const dispatch = useDispatch();

    return (
        <Modal show={props?.state?.modalRemove}>
            <Modal.Body>
                <div className="text-xl font-bold flex justify-center items-center">
                    Are you sure want to remove this product?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-9 justify-center items-center w-full">
                    <Button
                        onClick={() => {
                            props?.func?.removeProduct();
                            props?.state?.setModalRemove(false);
                        }}
                        className="bg-sky-700 text-yellow-200"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => props?.state?.setModalRemove(false)}
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
