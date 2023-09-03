import { Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColorAsync } from '../../../redux/features/homepageSlice';
import { useEffect } from 'react';

export default function ModalDeleteColor(props) {
    const dispatch = useDispatch()
    const isSuccess = useSelector((state) => state.homepage.success)

    useEffect(() => {
        if (isSuccess) {
            props.funcShow(false);
        }
    },[isSuccess])
    return (
        <>
        <Modal
            dismissible
            show={props.show}
                onClose={() => { props.funcShow(false)}}
        >
            <Modal.Header>
                <div className="text-xl">Delete Color</div>
            </Modal.Header>
            <Modal.Body>
                <div>
                Are you sure want to delete this color? 
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => { dispatch(deleteColorAsync(props.data?.id)) }}
                        disabled={isSuccess}
                >
                    Continue
                </button>
                <button
                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => { props.funcShow(false);}}
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    </>
    )
}