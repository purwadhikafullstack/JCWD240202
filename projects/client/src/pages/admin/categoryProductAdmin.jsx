import { useEffect, useState } from 'react';
import SideBarAdmin from '../../components/admin/adminPageSideBar';
import ComListCategory from '../../components/admin/product/comListCategory';
import ProductTabs from '../../components/admin/product/productTabs';
import { getAllCategoriesAsync } from '../../redux/features/homepageSlice';
import { useDispatch } from 'react-redux';
import ModalAddCategory from '../../components/admin/product/modalAddCategory';
import ModalEditCategory from '../../components/admin/product/modalEditCategory';
import ModalDeleteCategory from '../../components/admin/product/modalDeleteCategory';
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function CategoryProductAdmin() {
    const dispatch = useDispatch();
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [dataDetail, setDataDetail] = useState();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getAllCategoriesAsync());
        setTimeout(() => {
            setLoading(true);
        }, 1000);
        clearTimeout(setLoading(false))
    }, []);
    return (
        <>
            <Toaster />
            <Helmet>
                <title>IKEWA | Admin Category Products</title>
                <meta name="description" content="admin-category-product" />
            </Helmet>
            <div>
                <div className="sm:flex">
                    <SideBarAdmin />
                    <div className="sm:p-8 p-3 w-full">
                        <div className="font-bold text-2xl mt-2">
                            <h1>CATEGORY PRODUCTS</h1>
                        </div>
                        <ProductTabs />
                        <div className="mt-3 p-3 bg-white drop-shadow-lg rounded-lg">
                            <div className="flex justify-between items-center w-full mb-4">
                                <div className="flex">
                                </div>
                                <button
                                    onClick={() => setOpenModalAdd(true)}
                                    className="text-white text-[10px] border p-2 rounded-lg bg-[#0051BA] hover:bg-gray-400 font-bold focus:ring-2 focus:ring-main-500 w-22 md:mt-0"
                                >
                                    + ADD NEW CATEGORY
                                </button>
                            </div>
                            <div className="relative overflow-x-auto shadow-m rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center w-[100px]"
                                            >
                                                Image
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 border-r text-center"
                                            >
                                                name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px- py-3 text-center"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <ComListCategory
                                            funcShow={setOpenModalEdit}
                                            funcData={setDataDetail}
                                            modalDelete={setOpenModalDelete}
                                            loading={loading}
                                        />
                                    </tbody>
                                </table>
                                <div className="pt-9 flex justify-center">
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalAddCategory
                        show={openModalAdd}
                        funcShow={setOpenModalAdd}
                    />
                    <ModalEditCategory
                        show={openModalEdit}
                        funcShow={setOpenModalEdit}
                        data={dataDetail}
                    />
                    <ModalDeleteCategory
                        show={openModalDelete}
                        funcShow={setOpenModalDelete}
                        data={dataDetail}
                    />
                </div>
            </div>
        </>
    );
}
