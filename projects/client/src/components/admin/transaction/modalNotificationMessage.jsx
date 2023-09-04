import { Button, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';

export default function ModalNotificationMessage(props) {
    const _title = useRef();
    const _message = useRef();

    const submitMessage = () => {
        if (!_title.current.value || !_message.current.value) {
            toast.error('Please Fill All The Fields');
        } else {
            const title = _title.current.value;
            const message = _message.current.value;
            props?.state?.setTitle(title);
            props?.state?.setMessage(message);
            props?.state?.setModalNotification(false);
            props?.state?.setShowConfirm(true);
            _title.current.value = '';
            _message.current.value = '';
        }
    };

    return (
        <>
            <Modal
                show={props?.state?.modalNotification}
                onClose={() => props?.state?.setModalNotification(false)}
            >
                <Modal.Header>Message to User</Modal.Header>
                <Modal.Body>
                    <div>
                        <Label>Title</Label>
                        <TextInput ref={_title}></TextInput>
                    </div>
                    <div>
                        <Label>Message</Label>
                        <Textarea
                            ref={_message}
                            className="h-[100px]"
                        ></Textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={submitMessage}
                        className={`bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white text-sm disabled:cursor-not-allowed`}
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() =>
                            props?.state?.setModalNotification(false)
                        }
                        color={'failure'}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
