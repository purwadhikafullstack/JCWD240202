import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserWishlists } from '../../redux/features/wishlistSlice';
import UserSidebar from '../../components/user/sidebar/userSidebar';
import { Toaster } from 'react-hot-toast';
import WishlistCard from '../../components/user/wishlist/wishlistCard';
import { Button, Label, Select } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import PaginationButton from '../../components/user/pagination/paginationButton';

export default function Wishlist() {
    const dispatch = useDispatch();
    const wishlistData = useSelector((state) => state.wishlist.wishlists);
    const navigate = useNavigate();
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);

    const pageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        dispatch(getUserWishlists({ sort, page }));
    }, [sort, page]);

    return (
        <>
            <Toaster />
            <div className="flex justify-center gap-4 py-[80px] max-lg:flex-col max-lg:w-full max-lg:items-center max-lg:px-9 lg:flex-row ">
                <div className="md:w-1/4 flex justify-center">
                    <UserSidebar />
                </div>
                <div className="w-full flex justify-start">
                    <div className='md:w-3/4 max-md:w-full'>
                        <div className="font-bold text-3xl">Wishlists</div>
                        <div className="md:w-1/6 max-md:w-full pt-4">
                            <Select onChange={(e) => setSort(e.target.value)}>
                                <option value={'newest'}>Newest</option>
                                <option value={'oldest'}>Oldest</option>
                            </Select>
                        </div>
                        {wishlistData?.data?.wishlists.length === 0 ? (
                            <>
                                <div className="h-full flex justify-center items-center font-bold text-lg">
                                    <div className="flex flex-col items-center gap-4">
                                        <div>Wishlist Empty</div>
                                        <div>
                                            <Button
                                                onClick={() =>
                                                    navigate('/products')
                                                }
                                                color={'light'}
                                            >
                                                Browse Products Here
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="pt-9">
                                    {wishlistData?.data?.wishlists?.map(
                                        (value, index) => {
                                            return (
                                                <WishlistCard
                                                    key={index}
                                                    data={{ value }}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                                <div className="flex justify-center">
                                    <PaginationButton
                                        data={{
                                            totalPage: wishlistData?.totalPage,
                                            page,
                                            pageChange,
                                        }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
