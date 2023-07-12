import Carousel from '../../components/user/homepage/carousel';
import { Button } from 'flowbite-react';

export default function Homepage() {
    return (
        <div>
            <Carousel />
            <div>
                <div className="flex justify-center mt-9 text-3xl font-bold">
                    Pilihan Kategori
                </div>
            </div>
        </div>
    );
}
