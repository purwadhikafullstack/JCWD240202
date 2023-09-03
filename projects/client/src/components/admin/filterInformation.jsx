import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Dropdown, Label, Radio } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { getInformations } from '../../redux/features/stockHistorySlice';

export default function FilterInformation(props) {
    const dispatch = useDispatch();
    const informations = useSelector(
        (state) => state.stockHistory.informations,
    );

    const handleInformations = (informations) => {
        props?.data?.filterInformations(informations);
    };

    useEffect(() => {
        dispatch(getInformations());
    }, []);
    return (
        <>
            <div className="sm:mb-0 mb-2">
                <Dropdown
                    label={
                        props?.data?.informations
                            ? props?.data?.informations.replace(/%/g, ' ')
                            : 'Information'
                    }
                    className="px-5 text-center"
                    color="light"
                    size="sm"
                >
                    <div className="flex flex-col gap-2 mt-2">
                        {informations
                            ? informations?.data?.map((value, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="flex gap-3 items-center mb-4"
                                      >
                                          <Radio
                                              id={value.id}
                                              name="informations"
                                              onChange={() =>
                                                  handleInformations(
                                                      value.name.replace(
                                                          / /g,
                                                          '%',
                                                      ),
                                                  )
                                              }
                                              value={value.name}
                                              checked={
                                                  value.name ===
                                                  props?.data?.informations?.replace(
                                                      /%/g,
                                                      ' ',
                                                  )
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
