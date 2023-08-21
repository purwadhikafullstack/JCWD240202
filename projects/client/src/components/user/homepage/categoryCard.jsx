export default function CategoryCard(props) {
    return (
        <div className="hover:border hover:rounded-lg hover:shadow-lg hover:font-bold">
            <div className="w-[200px] h-[150px]">
                <div>
                    <img
                        src={props?.data?.image.startsWith('PIMG') ? process.env.REACT_APP_API_IMAGE_URL + props?.data?.image : props?.data?.image }
                        alt="..."
                        className="w-full h-[150px] rounded-lg"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center p-4">
                {props?.data?.name}
            </div>
        </div>
    );
}
