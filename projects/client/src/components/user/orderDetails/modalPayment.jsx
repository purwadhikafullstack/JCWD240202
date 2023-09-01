import { Button, Modal } from 'flowbite-react';
import PaymentMethod from '../checkoutCart/paymentMethod';

export default function ModalPayment(props) {
    return (
        <Modal show={props?.state?.modalPayment} onClose={() => props?.state?.setModalPayment(false)}>
            <Modal.Header>Bank Transfer Payment</Modal.Header>
            <Modal.Body>
                <PaymentMethod />
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-sky-700 text-yellow-300" onClick={() => props?.state?.setModalPayment(false)}>
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
