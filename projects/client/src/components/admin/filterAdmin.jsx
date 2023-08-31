import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllDataWh } from '../../redux/features/warehouseSlice';
import { Dropdown, Label, Radio } from 'flowbite-react';
import axios from 'axios';

export default function FilterAdmin(props) {
    const dispatch = useDispatch();
    const warehouse = useSelector((state) => state.warehouse.dataWh);
    const dataLogin = JSON.parse(localStorage?.getItem('user'));
    const [result, setResult] = useState([]);

    const setWh = async () => {
        try {
            const getWh = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/warehouses/list',
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            setResult(getWh?.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleWarehouses = (warehouses) => {
        props?.data?.warehouseChange(warehouses);
    };

    useEffect(() => {
        setWh();
    }, [warehouse]);
    return (
        <div>
            <Dropdown
                label={
                    props?.data?.warehouse
                        ? props?.data?.warehouse?.replace(/%/g, ' ')
                        : props?.data?.wh
                        ? props?.data?.wh?.replace(/%/g, ' ')
                        : 'Warehouse'
                }
                className="px-5 text-center"
                color="light"
                size="sm"
            >
                <div className="flex flex-col gap-2 mt-2">
                    {result
                        ? result?.data?.map((value, index) => {
                              return (
                                  <div
                                      key={index}
                                      className="flex gap-3 items-center mb-4"
                                  >
                                      <Radio
                                          id={value.city}
                                          name="warehouses"
                                          onChange={() =>
                                              handleWarehouses(
                                                  value.city.replace(/ /g, '%'),
                                              )
                                          }
                                          value={value.city}
                                          checked={
                                              value.city ===
                                              (props?.data?.warehouse?.replace(/%/g, ' '))
                                                  ? true
                                                  : value.city ===
                                                    (props?.data?.wh?.replace(/%/g, ' '))
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
        </div>
    );
}
