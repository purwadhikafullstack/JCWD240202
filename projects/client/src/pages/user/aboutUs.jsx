import { useEffect, useState } from 'react';
import SkeletonAboutUs from '../../components/user/aboutUs/skeletonAboutUs';

export default function AboutUs() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1000);
    }, []);
    return (
        <>
            {loading ? (
                <div className="w-full">
                    <div className="relative flex justify-center items-center mb-8">
                        <div className="w-full bg-black">
                            <img
                                src="/images/about-image.jpeg"
                                alt="about-img"
                                className="w-full max-h-[350px] object-cover opacity-50"
                            />
                        </div>
                        <div className="w-full text-3xl sm:text-5xl font-bold text-white z-2 absolute top-[38%] flex md:flex-row flex-col justify-center items-center gap-4">
                            <div>About Us | Welcome to</div>
                            <img
                                src="/logo2.png"
                                alt="logo-img"
                                className="w-28"
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="md:w-[85%] flex xl:flex-row flex-col jusitfy-center items-center gap-8">
                            <div className="flex-2">
                                <img
                                    src="/images/about-us.jpg"
                                    alt="about-us"
                                    className="sm:w-full max-h-[800px] rounded-lg"
                                />
                            </div>
                            <div className="w-full flex-1 px-8 lg:px-0">
                                <h1 className="font-bold text-2xl mb-2">
                                    About IKEWA
                                </h1>
                                <p className="font-semibold text-md mb-8">
                                    Welcome to IKEWA where we believe that
                                    furniture is more than just pieces to fill a
                                    space; it's an expression of your unique
                                    style, comfort, and the heart of your home.
                                    With a passion for design, quality, and
                                    exceptional customer service, we have been
                                    around since 2020.
                                </p>

                                <h1 className="font-bold text-2xl mb-2">
                                    Our Story{' '}
                                </h1>
                                <p className="font-semibold text-md mb-8">
                                    Founded by a group of furniture enthusiasts,
                                    IKEWA was born out of a shared love for
                                    beautiful, functional, and well-crafted
                                    furniture. Our journey began with a vision
                                    to bring together a curated collection of
                                    furniture that not only enhances your living
                                    spaces but also tells a story of
                                    craftsmanship and artistry.
                                </p>

                                <h1 className="font-bold text-2xl mb-2">
                                    Our Mission
                                </h1>
                                <p className="font-semibold text-md mb-8">
                                    At IKEWA our mission is to help you
                                    transform your house into a home. We strive
                                    to provide you with the highest quality
                                    furniture that aligns with your lifestyle,
                                    budget, and aesthetic preferences. We're
                                    here to make your furniture shopping
                                    experience enjoyable and hassle-free.
                                </p>

                                <h1 className="font-bold text-2xl mb-2">
                                    Our Values
                                </h1>
                                <p className="font-semibold text-md mb-2">
                                    Quality Craftsmanship: We handpick our
                                    furniture pieces from renowned manufacturers
                                    who share our commitment to quality and
                                    durability. Each item in our collection is
                                    built to last and withstand the test of
                                    time.
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Style Diversity: We understand that every
                                    home is unique, and your furniture should
                                    reflect your personal style. That's why we
                                    offer a wide range of styles, from classic
                                    to contemporary, ensuring you'll find the
                                    perfect pieces for your taste.
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Sustainability: We care about our
                                    environment and are committed to offering
                                    sustainable and eco-friendly furniture
                                    options. We aim to minimize our carbon
                                    footprint and contribute to a more
                                    sustainable future.
                                </p>
                                <p className="font-semibold text-md mb-8">
                                    Your Trusted Partner: At IKEWA we don't just
                                    sell furniture; we build relationships. We
                                    aim to be your trusted partner in furnishing
                                    your home, providing you with not just
                                    products, but inspiration, guidance, and
                                    support along the way.
                                </p>

                                <h1 className="font-bold text-2xl mb-2">
                                    Our Products
                                </h1>
                                <p className="font-semibold text-md mb-2">
                                    Explore our extensive selection of
                                    furniture, Including:
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Living Room Furniture: Sofas, entertainment
                                    centers, and more to create a cozy and
                                    inviting space. Bedroom Furniture: Beds,
                                    dressers, nightstands, and mattresses for a
                                    peaceful and rejuvenating sleep environment.{' '}
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Dining Room Furniture: Dining tables,
                                    chairs, and storage solutions for memorable
                                    family gatherings.
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Workspace Furniture: Desks, chairs, and
                                    storage options to make working from home
                                    both productive and comfortable.
                                </p>
                                <p className="font-semibold text-md mb-2">
                                    Kitchen Products: Elevate your culinary
                                    experience with our exquisite range of
                                    kitchen products, designed to inspire the
                                    chef in you.
                                </p>
                                <p className="font-semibold text-md mb-8">
                                    Bathroom Furniture: Transform your bathroom
                                    into a sanctuary of comfort and style with
                                    our meticulously curated selection of
                                    bathroom products.
                                </p>

                                <h1 className="font-bold text-2xl mb-2">
                                    Contact Us
                                </h1>
                                <p className="font-semibold text-md mb-2">
                                    Have questions or need assistance? Feel free
                                    to reach out to us by email at{' '}
                                    <span className="text-blue-600 underline">
                                        ikewa@gmail.com
                                    </span>{' '}
                                    . We're here to help you find the perfect
                                    furniture solutions for your home.
                                </p>

                                <p className="font-semibold text-md mb-2">
                                    Thank you for choosing IKEWA as your
                                    preferred destination for all your furniture
                                    and home decor needs. We look forward to
                                    being a part of your journey in creating a
                                    beautiful and comfortable living space that
                                    reflects your unique style. Welcome to the
                                    IKEWA family!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <SkeletonAboutUs />
            )}
        </>
    );
}
