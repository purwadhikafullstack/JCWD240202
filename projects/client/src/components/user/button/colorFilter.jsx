import { Dropdown, Label, Radio } from 'flowbite-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllColorAsync } from '../../../redux/features/homepageSlice';

export default function ColorFilter(props) {
    const dispatch = useDispatch();
    const colorData = useSelector((state) => state.homepage.color);

    const handleColor = (color) => {
        const id = color.split(',')[0];
        props?.state?.colorChange(id);
        const name = color.split(',')[1];
        props?.state?.setColorName(name);
        props?.state?.setPage(1);
    };

    useEffect(() => {
        dispatch(getAllColorAsync());
    }, []);
    return (
        <>
            <Dropdown
                label={`${
                    props?.state?.colorName
                        ? props?.state?.colorName
                        : 'Filter by Color'
                }`}
                className="px-5"
                color={'light'}
            >
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex gap-3 items-center mb-4">
                        <Radio
                            id="all"
                            name="color"
                            onClick={() => handleColor('')}
                            value={''}
                        />
                        <Label>ALL COLOR</Label>
                    </div>
                </div>
                {colorData?.data?.map((value, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-2 mt-2">
                            <div className="flex gap-3 items-center mb-4">
                                <Radio
                                    id="all"
                                    name="color"
                                    onClick={() =>
                                        handleColor(`${value.id},${value.name}`)
                                    }
                                    value={`${value.id},${value.name}`}
                                />
                                <Label>
                                    <div className="flex gap-2 items-center">
                                        {' '}
                                        <div
                                            style={{
                                                backgroundColor:
                                                    value.color_code,
                                            }}
                                            className="w-4 h-4 border"
                                        ></div>
                                        <div>{value.name}</div>
                                    </div>
                                </Label>
                            </div>
                        </div>
                    );
                })}
            </Dropdown>
        </>
    );
}
