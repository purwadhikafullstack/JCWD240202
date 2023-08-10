import { Select, Label } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAvailableWh } from '../../../redux/features/warehouseSlice';

export default function FilterWarehouse() {
    const dispatch = useDispatch();
    const warehouses = useSelector((state) => state.warehouse.availableWh);

    useEffect(() => {
        dispatch(getAvailableWh());
    }, []);

    return (
        <>
            <div>
                {' '}
                <Label>Warehouse : </Label>
                <Select>
                    <option>Choose Warehouse</option>
                    {warehouses?.map((value, index) => {
                        return <option>{value.province}</option>;
                    })}
                </Select>
            </div>
        </>
    );
}
