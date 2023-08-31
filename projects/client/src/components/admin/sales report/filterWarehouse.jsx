import { Select, Label } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllWarehousesAsync } from '../../../redux/features/warehouseSlice';

export default function FilterWarehouse(props) {
    const dispatch = useDispatch();
    const warehouses = useSelector((state) => state.warehouse.allWarehouse);

    const handleWarehouseChange = (e) => {
        const getId = e.target.value.split(',')[0];
        const getName = e.target.value.split(',')[1];
        props?.state?.setWarehouseId(getId);
        props?.state?.setWarehouseName(getName);
    };

    useEffect(() => {
        dispatch(getAllWarehousesAsync());
    }, []);

    return (
        <>
            <div>
                <Label>Choose Warehouse : </Label>
                <Select onChange={handleWarehouseChange}>
                    <option value={''}>All Warehouses</option>
                    {warehouses?.data?.map((value, index) => {
                        return (
                            <option
                                key={index}
                                value={`${value?.id},${value.province}`}
                            >
                                {value.province}
                            </option>
                        );
                    })}
                </Select>
            </div>
        </>
    );
}
