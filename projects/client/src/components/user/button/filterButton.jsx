import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllCategoriesAsync } from '../../../redux/features/homepageSlice';
import { Dropdown, Label, Radio } from 'flowbite-react';

export default function FilterButton(props) {
    console.log(props.data.category)
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.homepage.category);
    const [name, setName] = useState('');
    console.log(name)

    const handleCategory = (category) => {
        console.log(category, 'lalalalalalla')
        props?.data?.categoryChange(category);
        setName(category);
    };

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
    }, []);
    return (
        <Dropdown label={props.data?.category === '' ? 'Filter by Categories' : props.data?.category} className="px-5" color="light">
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex gap-3 items-center mb-4">
                    <Radio
                        id="all"
                        name="category"
                        onClick={() => handleCategory('')}
                        value={''}
                        defaultChecked={props.data?.category === '' ? true : false}
                    />
                    <Label>ALL CATEGORIES</Label>
                </div>
                {categories
                    ? categories?.data?.map((value, index) => {
                          return (
                              <div
                                  key={index}
                                  className="flex gap-3 items-center mb-4"
                              >
                                  <Radio
                                      id={value.name}
                                      name="category"
                                      onClick={() => handleCategory(value.name)}
                                      value={value.name}
                                      defaultChecked={
                                        props.data?.category === value.name ? true : false
                                      }
                                  />
                                  <Label>{value.name}</Label>
                              </div>
                          );
                      })
                    : ''}
            </div>
        </Dropdown>
    );
}
