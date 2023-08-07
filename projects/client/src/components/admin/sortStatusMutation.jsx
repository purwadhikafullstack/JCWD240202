import { Dropdown, Label, Radio } from 'flowbite-react';

export default function SortStatusMutation(props) {
    const handleStatus = (status) => {
        props?.data?.statusChange(status);
    };
    return (
        <div className="sm:mb-0 mb-2">
            <Dropdown
                label={
                    props?.data?.status === 'waiting'
                        ? 'Waiting'
                        : props?.data?.status === 'confirmed'
                        ? 'Confirmed'
                        : props?.data?.status === 'rejected'
                        ? 'Rejected'
                        : 'Status'
                }
                className="px-5 text-center"
                color="light"
                size="sm"
            >
                <div className="flex flex-col gap-2 mt-2">
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'name-asc'}
                            onChange={() => handleStatus('waiting')}
                            checked={
                                props?.data?.status === 'waiting' ? true : false
                            }
                        />
                        <Label>Waiting</Label>
                    </div>
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'name-desc'}
                            onChange={() => handleStatus('confirmed')}
                            checked={
                                props?.data?.status === 'confirmed'
                                    ? true
                                    : false
                            }
                        />
                        <Label>Confirmed</Label>
                    </div>
                    <div className="flex gap-3 items-center mb-2">
                        <Radio
                            id="name"
                            name="sort"
                            value={'name-desc'}
                            onChange={() => handleStatus('rejected')}
                            checked={
                                props?.data?.status === 'rejected'
                                    ? true
                                    : false
                            }
                        />
                        <Label>Rejected</Label>
                    </div>
                </div>
            </Dropdown>
        </div>
    );
}
