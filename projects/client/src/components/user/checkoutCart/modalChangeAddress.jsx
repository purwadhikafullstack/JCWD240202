import { Button, Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserAddressAsync } from '../../../redux/features/addressSlice';
import { AiOutlineCheck } from 'react-icons/ai';
import ModalAddAddress from './modalAddAddress';

export default function ModalChangeAddress(props) {
    const dispatch = useDispatch();
    const userAddress = useSelector((state) => state.address.address);
    const [choose, setChoose] = useState('');
    const [showAddAddress, setShowAddAddress] = useState(false);

    const openAddAddress = () => {
        props?.data?.setShowModal(false);
        setShowAddAddress(true);
    };

    const closeAddAddress = () => {
        props?.data?.setShowModal(true);
        setShowAddAddress(false);
    };

    useEffect(() => {
        dispatch(getUserAddressAsync());
    }, []);
    return (
        <>
            <Modal
                show={props?.data?.showModal}
                onClose={() => props?.data?.setShowModal(false)}
            >
                {console.log('userAddress => ', userAddress)}
                <Modal.Header>Choose Address</Modal.Header>
                <Modal.Body>
                    <div className="pb-2">
                        <Button
                            onClick={() => openAddAddress(true)}
                            color={'light'}
                            className="w-full"
                        >
                            Add new address
                        </Button>
                    </div>
                    {userAddress?.data?.map((value, index) => {
                        return (
                            <div className="border border-black mb-2 flex p-2 rounded-xl">
                                <div className="flex-1 pr-4">
                                    {value.is_primary === true ? (
                                        <div className="font-bold">
                                            Primary Address
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                    <div>{value.receiver_name}</div>
                                    <div>{value.receiver_number}</div>
                                    <div>
                                        {value.street}, {value.city},{' '}
                                        {value.province}, {value.postcode}{' '}
                                    </div>
                                    <div className="pt-4 text-black font-bold hover:text-sky-700 hover:cursor-pointer">
                                        Edit Address
                                    </div>
                                </div>
                                <div className="flex-2 w-[100px] flex items-center">
                                    {choose === value?.id ? (
                                        <div className="flex justify-center items-center w-full">
                                            <AiOutlineCheck size={25} />
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={() => setChoose(value?.id)}
                                        >
                                            Choose
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex gap-2">
                        <Button>Save</Button>
                        <Button color={'failure'}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ModalAddAddress data={{ closeAddAddress, showAddAddress }} />
        </>
    );
}
