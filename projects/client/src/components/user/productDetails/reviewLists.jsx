import { Avatar, Rating } from 'flowbite-react';

export default function ReviewLists(props) {
    let star = [];
    for (let i = 0; i < 5; i++) {
        if (i < props?.data?.value?.rating) {
            star.push(true);
        } else {
            star.push(false);
        }
    }
    return (
        <>
            <div className="border-t h-[150px] w-full py-2 px-2">
                <div>
                    <div className="flex gap-4 items-center">
                        <div>
                            <Rating size="md">
                                {star?.map((value, index) => {
                                    return value === true ? (
                                        <Rating.Star key={index} />
                                    ) : (
                                        <Rating.Star
                                            key={index}
                                            className="text-gray-200"
                                        />
                                    );
                                })}
                            </Rating>
                        </div>
                        <div>{props?.data?.value?.createdAt}</div>
                    </div>
                    <div className="flex gap-2 items-center pt-2">
                        <div>
                            <Avatar
                                alt="profile_picture"
                                img={
                                    props?.data?.value?.user
                                        ?.profile_picture === null
                                        ? ''
                                        : process.env.REACT_APP_API_IMAGE_URL +
                                          `${props?.data?.value?.user?.profile_picture}`
                                }
                                rounded
                                size={'md'}
                            />
                        </div>
                        <div className="font-bold">
                            {props?.data?.value?.user?.first_name === null &&
                            props?.data?.value?.user?.last_name === null
                                ? props?.data?.value?.user?.email
                                : `${props?.data?.value?.user?.first_name} ${props?.data?.value?.user?.last_name}`}
                        </div>
                    </div>
                    <div className="mt-4 flex flex-wrap">
                        {props?.data?.value?.comment}
                    </div>
                </div>
            </div>
        </>
    );
}
