import { Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
// import { deleteProductAsync } from '../../../redux/features/productSlice';
import { deleteCategoryAsync } from '../../../redux/features/categorySlice';


export default function ModalDeleteCategory(props) {
    const dispatch = useDispatch()
    return (
        <>
            <Modal
                dismissible
                show={props.show}
                onClose={() => props.funcShow(false)}
            >
                <Modal.Header>
                    <div className="text-xl">Delete Category</div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure want to delete this category? 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => { dispatch(deleteCategoryAsync(props.data?.id)); props.funcShow(false) }}
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