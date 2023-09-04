import { useNavigate } from 'react-router-dom';

export default function CategoryCard(props) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => {
                navigate(`/categories/${props?.data?.name.toLowerCase()}`, {
                    state: { categoryId: props?.data?.id },
                });
            }}
            className="hover:cursor-pointer hover:font-bold text-lg"
        >
            <div className="md:w-[200px] md:h-[150px] max-md:w-[150px] max-md:w-[75px]">
                <div>
                    <img
                        src={
                            props?.data?.image.startsWith('PIMG')
                                ? process.env.REACT_APP_API_IMAGE_URL +
                                  props?.data?.image
                                : props?.data?.image
                        }
                        alt="..."
                        className="w-full md:h-[150px] max-md:h-[100px] rounded-lg transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center p-4">
                {props?.data?.name}
            </div>
        </div>
    );
}
