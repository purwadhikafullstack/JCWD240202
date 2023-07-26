/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-throw-literal */
import { Modal } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { editCategoryAsync, editImageCategoryAsync } from '../../../redux/features/categorySlice';

export default function ModalEditCategory(props) {
    console.log(props.data)
    const dispatch = useDispatch()
    // const documentBodyRef = useRef(null);
    const [showEditImg, setShowEditImg] = useState(true);
    const [imageCategory, setImageCategory] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    // const [name, setName] = useState('')
    const name = useRef()

    console.log(imageCategory)

    const onChangeProductImg = (e) => {
        try {
            const selectedFIles = [];
            const targetFiles = e.target.files[0];
            console.log(targetFiles)

            if (
                e.target.files[0]?.type.split('/')[1].toLowerCase() !== 'jpg' &&
                e.target.files[0]?.type.split('/')[1].toLowerCase() !==
                    'jpeg' &&
                e.target.files[0]?.type.split('/')[1].toLowerCase() !== 'png'
            ) {
                throw { message: 'Format file must jpg, jpeg, or png' };
            }

            if (e.target.files[0]?.size >= 1000000) {
                throw { message: 'File size max 1 Mb!' };
            }


            selectedFIles.push(URL.createObjectURL(targetFiles));

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

    useEffect(() => {
        // name.current.value = props.data?.name
    }, []);
    return (
        <>
            <Modal
                // root={documentBodyRef.current}
                dismissible
                className=""
                show={props.show}
                onClose={() => props.funcShow(false)}
            >
                <Modal.Header>
                    <div className="text-xl">Add New Product</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-1 shadow-md mb-2 w-[170px] rounded-md border p-2">
                        {imagePreview?.length >= 1 ? (
                            imagePreview.map((value, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={value}
                                        className="border object-contain border-slate-400 h-[100px] rounded-md"
                                    />
                                );
                            })
                        ) : (
                            <img
                                src={
                                    props.data?.image.startsWith('PIMG')
                                        ? process.env
                                              .REACT_APP_API_IMAGE_URL +
                                          props.data?.image
                                        : props.data?.image
                                }
                                alt="image-preview"
                                className="border object-contain border-slate-400 w-[150px] rounded-md"
                            />
                        )}
                    </div>
                    <div className="text-xs">
                        * Maximum size per file 1000 Kilobytes (1 Megabytes).
                        Allowed file extensions: .JPG .JPEG .PNG
                    </div>
                    <div hidden={showEditImg}>
                        <label className='bg-gray-500 hover:bg-gray-400 rounded-lg text-white py-2 mt-1 text-sm flex justify-center w-[182px] mb-1 cursor-pointer'>
                            <input
                                onChange={onChangeProductImg}
                                type="file"
                                multiple="multiple"
                                className="my-1 rounded-md hidden"
                            ></input>
                            <p>Upload Images</p>
                        </label>
                        <div>
                            <button
                                className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                                onClick={() => dispatch(editImageCategoryAsync(imageCategory, props.data?.id))}
                                disabled={imagePreview?.length === 0}
                            >
                                Save Images
                            </button>
                            <button
                                className="bg-red-600 hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 ml-2"
                                onClick={() => {
                                    setShowEditImg(true);
                                    setImagePreview(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        hidden={!showEditImg}
                        className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 my-2"
                        onClick={() => setShowEditImg(false)}
                    >
                        Edit Images
                    </button>
                    <div className="block mb-3">
                        <span className="block text-sm font-medium text-slate-700 my-1">
                            Name :
                        </span>
                        <input
                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                            placeholder="Name"
                            // onChange={(e) => {
                            //     setName(e.target.value);
                            // }}
                            // value={name}
                            type="text"
                            ref={name}
                            defaultValue={props.data?.name}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => dispatch(editCategoryAsync(name.current.value, props.data?.id))}
                        // disabled={!name.current.value}
                    >
                        Confirm
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