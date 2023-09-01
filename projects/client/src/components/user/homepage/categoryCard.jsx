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
            <div className="w-[200px] h-[150px]">
                <div>
                    <img
                        src={
                            props?.data?.image.startsWith('PIMG')
                                ? process.env.REACT_APP_API_IMAGE_URL +
                                  props?.data?.image
                                : props?.data?.image
                        }
                        alt="..."
                        className="w-full h-[150px] rounded-lg transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center p-4">
                {props?.data?.name}
            </div>
        </div>
    );
}
