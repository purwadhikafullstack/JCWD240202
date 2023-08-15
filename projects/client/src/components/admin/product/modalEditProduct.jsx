/* eslint-disable no-throw-literal */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { Modal } from 'flowbite-react';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAsync, editProductImageAsync } from '../../../redux/features/productSlice';

export default function ModalEditProduct(props) {
    const documentBodyRef = useRef(null);
    const dispatch = useDispatch();
    const isSuccess = useSelector((state) => state.product.success);
    const proDetails = useSelector((state) => state.product.details);
    const [showEditImg, setShowEditImg] = useState(true);
    const [imageProduct, setImageProduct] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const onChangeProductImg = (e) => {
        try {
            const selectedFIles = [];
            let targetFiles = [...e.target.files];

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

            if (!targetFiles) {
                setImageProduct(proDetails.data?.product_images);
            }

            setImageProduct(targetFiles);
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

    const defaultValue = () => {
        if (isSuccess) {
            props.funcShow(false);
        }
    };

    useEffect(() => {
        documentBodyRef.current = document.body;
        setName(props.data?.name);
        setCategory(props.data?.category_id);
        setColor(props.data?.color_id);
        setPrice(props.data?.price);
        setDescription(props.data?.description);
        setLength(props.data?.length);
        setWidth(props.data?.width);
        setHeight(props.data?.height);
        setWeight(props.data?.weight);
        defaultValue()
    }, [proDetails, isSuccess]);

    return (
        <>
            <Modal
                root={documentBodyRef.current}
                dismissible
                show={props.show}
                onClose={() => props.funcShow(false)}
            >
                <Modal.Header>
                    <div className="text-xl">Edit Product</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-5 gap-2 shadow-md mb-2 rounded-md w-full border p-2">
                        {imagePreview?.length >= 1
                            ? imagePreview.map((value, index) => {
                                  return (
                                      <img
                                          key={index}
                                          src={value}
                                          alt="image-preview"
                                          className="border object-contain border-slate-400 h-[100px] rounded-md"
                                      />
                                  );
                              })
                            : proDetails.data?.findProduct?.product_images?.map(
                                (value, index) => {
                                      return (
                                          <img
                                              src={
                                                  value.name.startsWith('PIMG')
                                                      ? process.env
                                                            .REACT_APP_API_IMAGE_URL +
                                                        value.name
                                                      : value.name
                                              }
                                              key={index}
                                              alt="image-product"
                                              className="border object-contain border-slate-400 h-[100px] rounded-md"
                                          />
                                      );
                                  },
                              )}
                    </div>
                    <div className="text-xs">
                        * Maximum size per file 1000 Kilobytes (1 Megabytes).
                        Allowed file extensions: .JPG .JPEG .PNG
                    </div>
                    <div className="text-xs">* Maximum 5 files</div>
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
                                onClick={() => dispatch(editProductImageAsync(imageProduct, props.data?.id))}
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
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            value={name}
                            type="text"
                            name="receiver_name"
                        />
                    </div>
                    <div className="block mb-3">
                        <span className="block text-sm font-medium text-slate-700 mb-1">
                            Description :
                        </span>
                        <textarea
                            maxLength={250}
                            type="text"
                            placeholder="Description"
                            className="resize-none border border-gray-400 w-[300px] rounded-md px-2 h-24 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            value={description}
                        />
                        <div className="flex text-slate-400 text-xs justify-end mt-[-25px] mr-1">
                            <p>{description?.length} / 250</p>
                        </div>
                    </div>
                    <select
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        className="border border-gray-400 rounded-md mb-1"
                        value={category}
                    >
                        <option value='' disabled>Category</option>
                        {props?.category?.data?.map((value, index) => {
                            return (
                                <option value={value.id} key={value.id}>
                                    {value.name}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        onChange={(e) => {
                            setColor(e.target.value);
                        }}
                        className="border border-gray-400 rounded-md ml-3"
                        value={color}
                    >
                        <option value='' disabled>Base Color</option>
                        {props?.color?.data?.map((value, index) => {
                            return (
                                <option value={value.id} key={value.id}>
                                    {value.name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="block mb-3">
                        <span className="block text-sm font-medium text-slate-700 my-1">
                            Price :
                        </span>
                        <input
                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                            placeholder="Price"
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            value={price}
                            type="number"
                            min={0}
                        />
                    </div>
                    <div className="flex gap-3">
                        <div>
                            <div className="text-sm font-medium text-slate-700 mb-1">
                                Length :
                            </div>
                            <input
                                type="number"
                                placeholder="*In Centimeter"
                                className="placeholder:text-xs w-[130px] border border-gray-400 rounded-md"
                                onChange={(e) => {
                                    setLength(e.target.value);
                                }}
                                value={length}
                                min={0}
                            ></input>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-700 mb-1">
                                Width :
                            </div>
                            <input
                                type="number"
                                placeholder="*In Centimeter"
                                className="placeholder:text-xs w-[130px] border border-gray-400 rounded-md"
                                onChange={(e) => {
                                    setWidth(e.target.value);
                                }}
                                value={width}
                                min={0}
                            ></input>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-700 mb-1">
                                Height :
                            </div>
                            <input
                                type="number"
                                placeholder="*In Centimeter"
                                className="placeholder:text-xs w-[130px] border border-gray-400 rounded-md"
                                onChange={(e) => {
                                    setHeight(e.target.value);
                                }}
                                value={height}
                                min={0}
                            ></input>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-slate-700 mb-1">
                                Weight :
                            </div>
                            <input
                                type="number"
                                placeholder="*In Grams"
                                className="placeholder:text-xs w-[130px] border border-gray-400 rounded-md"
                                onChange={(e) => {
                                    setWeight(e.target.value);
                                }}
                                value={weight}
                                min={0}
                            ></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed`}
                        onClick={() => dispatch(editProductAsync(name, category, color, price, description, length, width, height, weight, props.data?.id))}
                        disabled={!name ||
                            !category ||
                            !color ||
                            !price ||
                            !description ||
                            !length ||
                            !width ||
                            !height ||
                            !weight}
                    >
                        Save Changes
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
    );
}
