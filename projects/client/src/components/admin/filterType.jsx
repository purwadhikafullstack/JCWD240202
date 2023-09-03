import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Dropdown, Label, Radio } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { getTypes } from '../../redux/features/stockHistorySlice';

export default function FilterType(props) {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.stockHistory.types);

    const handleTypes = (types) => {
        props?.data?.filterTypes(types);
    };

    useEffect(() => {
        dispatch(getTypes());
    }, []);
    return (
        <>
            <div className="sm:mb-0 mb-2">
                <Dropdown
                    label={props?.data?.types ? props?.data?.types : 'Type'}
                    className="px-5 text-center"
                    color="light"
                    size="sm"
                >
                    <div className="flex flex-col gap-2 mt-2">
                        {types
                            ? types?.data?.map((value, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="flex gap-3 items-center mb-4"
                                      >
                                          <Radio
                                              id={value.id}
                                              name="types"
                                              onChange={() =>
                                                  handleTypes(value.name)
                                              }
                                              value={value.name}
                                              checked={
                                                  value.name ===
                                                  props?.data?.types
                                                      ? true
                                                      : false
                                              }
                                          />
                                          <Label>{value.name}</Label>
                                      </div>
                                  );
                              })
                            : ''}
                    </div>
                </Dropdown>
            </div>
        </>
    );
}
