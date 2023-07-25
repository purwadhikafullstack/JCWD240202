import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllDataWh } from '../../redux/features/warehouseSlice';
import { Dropdown, Label, Radio } from 'flowbite-react';

export default function FilterAdmin(props) {
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse.dataWh);

    const handleWarehouses = (warehouses) => {
        props?.data?.warehouseChange(warehouses);
    };

    useEffect(() => {
        dispatch(getAllDataWh());
    }, []);
    return (
        <>
            <Dropdown
                label={
                    props?.data?.warehouse
                        ? props?.data?.warehouse
                        : 'Warehouses'
                }
                className="px-5 text-center"
                color="light"
                size="sm"
            >
                <div className="flex flex-col gap-2 mt-2">
                    {warehouse
                        ? warehouse?.map((value, index) => {
                              return (
                                  <div
                                      key={index}
                                      className="flex gap-3 items-center mb-4"
                                  >
                                      <Radio
                                          id={value.city}
                                          name="warehouses"
                                          onChange={() =>
                                              handleWarehouses(value.city)
                                          }
                                          value={value.city}
                                          checked={
                                              value.city ===
                                              props?.data?.warehouse
                                                  ? true
                                                  : false
                                          }
                                      />
                                      <Label>{value.city}</Label>
                                  </div>
                              );
                          })
                        : ''}
                </div>
            </Dropdown>
        </>
    );
}
