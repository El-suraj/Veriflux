import * as React from "react";
import {Swiper, SwiperSlide} from "swiper/react";


const Carousel = () => {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1557683316-973673baf926",
            title: "secure verification",
            description: "Verify the authenticity of your certificates with ease"
        },
        {
            image: "https://images.unsplash.com/photo-1557683316-973673baf926",
            title: "Easy  to use",
            description: "A user-friemdly interface for quick and hassle free verification"
        },
        {
            image: "https://images.unsplash.com/photo-1557683316-973673baf926",
            title: "Trusted by thousand",
            description: "join thousands of users who trust Veriflux for their verification needs"
        }
    ];

    return (
        <div className="my-16">
            <Swiper
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key = {index}>
                        <div className="relative">
                            <img src={slide.image} alt="slide" className="w-full h-96 object-cover"/>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-white text-center">
                                    <h2 className="text-2xl font-bold">{slide.title}</h2>
                                    <p className="text-lg">{slide.description}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    );

};

export default Carousel;
