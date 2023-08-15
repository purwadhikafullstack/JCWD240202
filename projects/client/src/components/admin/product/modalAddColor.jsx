import { Modal } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
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
            // root={documentBodyRef.current}
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
                {/* <div className="grid grid-cols-1 shadow-md mb-2 w-[150px] rounded-md border p-2">
                    {imagePreview?.length >= 1 ? (
                        imagePreview.map((value, index) => {
                            return (
                                <img
                                    key={index}
                                    src={value}
                                    className="border object-contain border-slate-400 rounded-md"
                                />
                            );
                        })
                    ) : (
                        <img
                            src="https://flxtable.com/wp-content/plugins/pl-platform/engine/ui/images/image-preview.png"
                            alt="image-preview"
                            className="border object-contain border-slate-400 w-[150px] rounded-md"
                        />
                    )}
                </div> */}
                {/* <div className="text-xs">
                    * Maximum size per file 1000 Kilobytes (1 Megabytes).
                    Allowed file extensions: .JPG .JPEG .PNG
                </div> */}
                {/* <label className="bg-gray-500 hover:bg-gray-400 rounded-lg text-white py-2 mt-1 text-sm flex justify-center w-[182px] mb-1 cursor-pointer">
                    <input
                        // onChange={onChangeProductImg}
                        type="file"
                        multiple="multiple"
                        className="my-1 rounded-md hidden"
                    ></input>
                    <p>Upload Images</p>
                </label> */}
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
                    // disabled={imagePreview?.length === 0}
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