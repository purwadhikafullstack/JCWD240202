import { Modal } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {ChromePicker} from 'react-color'
import { addNewColorAsync } from '../../../redux/features/homepageSlice';

export default function ModalAddColor(props) {
    const dispatch = useDispatch()
    const name = useRef();
    const isSuccess = useSelector((state) => state.homepage.success)
    const [pickColor, setPickColor] = useState('')
    const handleChangeColor = (color) => {
        setPickColor(color.hex);
      };

    const close = () => {
        name.current.value = '';
    };
    useEffect(() => {
        if (isSuccess) {
            props.funcShow(false);
            close()
        }
    },[isSuccess])
    return (
        <>
        <Modal
            dismissible
            className=""
            show={props.show}
            onClose={() => {
                props.funcShow(false);
                close();
            }}
        >
            <Modal.Header>
                <div className="text-xl">Add New Category</div>
            </Modal.Header>
            <Modal.Body>
                <ChromePicker color={ pickColor } onChange={ handleChangeColor }/>
                <div className="block my-3">
                    <span className="block text-sm font-medium text-slate-700 my-1">
                        Name :
                    </span>
                    <input
                        className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                        placeholder="Name"
                        type="text"
                        ref={name}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                    onClick={() =>dispatch(addNewColorAsync(name.current.value, pickColor))}
                >
                    Confirm
                </button>
                <button
                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                    onClick={() => {
                        props.funcShow(false);
                        close();
                    }}
                >
                    Cancel
                </button>
            </Modal.Footer>
        </Modal>
    </>
    )
}