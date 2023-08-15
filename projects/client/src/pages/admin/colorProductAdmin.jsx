import SideBarAdmin from '../../components/admin/adminPageSideBar';
import ComListColor from '../../components/admin/product/comListColor';
import ProductTabs from '../../components/admin/product/productTabs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllColorAsync } from '../../redux/features/homepageSlice';
import ModalAddColor from '../../components/admin/product/modalAddColor';
import ModalDeleteColor from '../../components/admin/product/modalDeleteColor';
import { Toaster } from 'react-hot-toast';



export default function ColorProductAdmin() {
    const dispatch = useDispatch();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        dispatch(getAllColorAsync())
    }, []);

    return (
        <>
            <Toaster/>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="p-8 w-full">
                        <div className="font-bold text-2xl mt-2">
                            <h1>BASE COLOR PRODUCTS</h1>
                        </div>
                        <ProductTabs />
                        <div className="mt-3 p-3 bg-white drop-shadow-lg rounded-lg">
                            <div className="flex justify-between items-center w-full mb-4">
                                <div className="flex">
                                    {/* <FilterButton data={{ categoryChange }} />
                                    <SortButton data={{ sortChange }} /> */}
                                </div>
                                <button
                                    onClick={() => setOpenModalAdd(true)}
                                    className="text-white text-[10px] border p-2 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-22 md:mt-0"
                                >
                                    + ADD NEW COLOR
                                </button>
                                {/* <SearchBar data={{ searchChange }} /> */}
                            </div>
                            <div className="relative overflow-x-auto shadow-m rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center w-[100px]"
                                            >
                                                
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center w-[350px]"
                                            >
                                                name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 text-center w-[350px]"
                                            >color code</th>
                                            <th
                                                scope="col"
                                                className="px- py-3 text-center w-[100px]"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ComListColor
                                        funcData={setDataDetail}
                                        modalDelete={setOpenModalDelete}/>
                                    </tbody>
                                </table>
                                <div className="pt-9 flex justify-center">
                                    {/* <PaginationButton
                                        data={{
                                            totalPage: products?.totalPage,
                                            page,
                                            pageChange,
                                        }}
                                    /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalAddColor
                    show={openModalAdd}
                    funcShow={setOpenModalAdd}
                    />
                    <ModalDeleteColor
                        show={openModalDelete}
                        funcShow={setOpenModalDelete}
                        data={dataDetail}/>
                </div>
            </div>
        </>
    )
}