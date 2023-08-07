/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-throw-literal */
import { Modal } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAsync } from '../../../redux/features/categorySlice';

export default function ModalAddCategory(props) {
    const isSuccess = useSelector((state) => state.category.success);
    console.log(isSuccess);
    const dispatch = useDispatch();
    // const documentBodyRef = useRef(null);
    const [imageCategory, setImageCategory] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const name = useRef();

    const onChangeProductImg = (e) => {
        try {
            const selectedFIles = [];
            const targetFiles = [...e.target.files];

            targetFiles.map((value) => {
                if (
                    value.type.split('/')[1].toLowerCase() !== 'jpg' &&
                    value.type.split('/')[1].toLowerCase() !== 'jpeg' &&
                    value.type.split('/')[1].toLowerCase() !== 'png'
                ) {
                    throw { message: 'Format file must jpg, jpeg, or png' };
                }
            });

            targetFiles.map((value) => {
                if (value.size > 100000000)
                    throw {
                        message: `${value.originalname} is Too Large`,
                    };
            });

            targetFiles.map((file) => {
                return selectedFIles.push(URL.createObjectURL(file));
            });

            setImageCategory(targetFiles);
            setImagePreview(selectedFIles);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            } else {
                toast.error(error.message, {
                    position: 'top-center',
                    duration: 2000,
                    style: {
                        border: '2px solid #000',
                        borderRadius: '10px',
                        background: '#DC2626',
                        color: 'white',
                    },
                });
            }
        }
    };

    const close = () => {
        setImagePreview(null);
        name.current.value = '';
    };

    useEffect(() => {
        // documentBodyRef.current = document.body;
        if (isSuccess) {
            name.current.value = '';
            setImagePreview(null);
            props.funcShow(false);
        }
    }, [isSuccess]);
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
                    <div className="grid grid-cols-1 shadow-md mb-2 w-[150px] rounded-md border p-2">
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
                    </div>
                    <div className="text-xs">
                        * Maximum size per file 1000 Kilobytes (1 Megabytes).
                        Allowed file extensions: .JPG .JPEG .PNG
                    </div>
                    <label className="bg-gray-500 hover:bg-gray-400 rounded-lg text-white py-2 mt-1 text-sm flex justify-center w-[182px] mb-1 cursor-pointer">
                        <input
                            onChange={onChangeProductImg}
                            type="file"
                            multiple="multiple"
                            className="my-1 rounded-md hidden"
                        ></input>
                        <p>Upload Images</p>
                    </label>
                    <div className="block mb-3">
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
                        onClick={() =>
                            dispatch(
                                addCategoryAsync(
                                    name.current.value,
                                    imageCategory,
                                ),
                            )
                        }
                        disabled={imagePreview?.length === 0}
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
    );
}
