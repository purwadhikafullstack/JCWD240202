import { Modal } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { deleteProductAsync } from '../../../redux/features/productSlice';


export default function ModalDeleteProduct(props) {
    const dispatch = useDispatch()
    return (
        <>
            <Modal
                dismissible
                show={props.show}
                onClose={() => props.funcShow(false)}
            >
                <Modal.Header>
                    <div className="text-xl">Delete Product</div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure want to delete this product? 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => { dispatch(deleteProductAsync(props.data?.id, props.filter)); props.funcShow(false) }}
                    >
                        Continue
                    </button>
                    <button
                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => props.funcShow(false)}
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}