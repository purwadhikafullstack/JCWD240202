import { Modal } from 'flowbite-react';
import DataDetail from './dataDetailModal';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function ModalTransactionDetail(props) {
    const [show, setShow] = useState(false)
    const showNotificationModal = () => {
        props?.confirm?.setModalNotification(true)
    }
    return (
        <>
            <Toaster />
            <Modal
                dismissible
                show={props?.data?.openDetail}
                onClose={() => { props.data.setOpenDetail(false); setShow(false)}}
            >
                <Modal.Header>
                    <div className="text-2xl">Transaction Detail</div>
                </Modal.Header>
                <Modal.Body>
                    <DataDetail
                        data={props?.data?.transaction}
                        detailId={props?.data?.detailId}
                        history={{ show, setShow }}
                        confirm={props?.confirm}
                        notification={{showNotificationModal}}
                    />
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}
