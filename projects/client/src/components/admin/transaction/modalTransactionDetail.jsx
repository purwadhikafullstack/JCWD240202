import { Modal } from 'flowbite-react';
import DataDetail from './dataDetailModal';

export default function ModalTransactionDetail(props) {
    return (
        <>
            <Modal
                dismissible
                show={props?.data?.openDetail}
                onClose={() => props.data.setOpenDetail(false)}
            >
                <Modal.Header>
                    <div className="text-2xl">Transaction Detail</div>
                </Modal.Header>
                <Modal.Body>
                    <DataDetail data={props?.data?.transaction} detailId={props?.data?.detailId } />
                </Modal.Body>
                {/* <Modal.Footer>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}