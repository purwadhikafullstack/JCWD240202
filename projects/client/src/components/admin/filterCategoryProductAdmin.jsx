import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCategoriesAsync } from '../../redux/features/homepageSlice';
import { Dropdown, Label, Radio } from 'flowbite-react';

export default function FilterCategoryAdmin(props) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);

    const handleCategory = (category) => {
        props?.data?.categoryChange(category);
    };

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    return (
        <div>
            <Dropdown
                label={
                    props?.data?.category ? props?.data?.category : 'Category'
                }
                className="px-5 text-center"
                color="light"
                size="sm"
            >
                <div className="flex flex-col gap-2 mt-2">
                    {categories
                        ? categories?.data?.map((value, index) => {
                              return (
                                  <div
                                      key={index}
                                      className="flex gap-3 items-center mb-4"
                                  >
                                      <Radio
                                          id={value.name}
                                          name="warehouses"
                                          onChange={() =>
                                              handleCategory(value.name)
                                          }
                                          value={value.name}
                                          checked={
                                              value.name ===
                                              props?.data?.category
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
    );
}
