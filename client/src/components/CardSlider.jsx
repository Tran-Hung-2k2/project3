import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const CardSlider = ({ cards }) => {
    const CustomPrevArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute z-10 text-2xl -translate-y-1/2 text-neutral-200 top-1/2 left-4 focus:outline-none"
            >
                {'❮'}
            </button>
        );
    };

    const CustomNextArrow = (props) => {
        const { onClick } = props;
        return (
            <button
                onClick={onClick}
                className="absolute text-2xl -translate-y-1/2 text-neutral-200 top-1/2 right-4 focus:outline-none"
            >
                {'❯'}
            </button>
        );
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };

    return (
        <Slider {...settings} className="h-full">
            {cards.map(
                (card, index) =>
                    index < 5 && (
                        <div key={index} className="h-full px-2">
                            <div className="relative w-full h-full shadow-xl card bg-base-100">
                                <Link to={`/course/${card.Course_ID}`}  className="w-full p-2 border rounded-lg">
                                    <img
                                        src={card.Image}
                                        alt={card.Name}
                                        className="object-cover w-full rounded-lg h-52"
                                    />
                                </Link>
                                <div className="card-body">
                                    <h2 className="overflow-hidden h-14 card-title">
                                        {card.Name}
                                        <div className="text-white badge badge-success">MỚI</div>
                                    </h2>
                                    <div className="flex mt-2 mb-4">
                                        <img
                                            className="object-fill h-6 mr-3"
                                            src={card.User.Avatar}
                                            alt="organization"
                                        />
                                        <div>{card.User.Name}</div>
                                    </div>
                                    <div className="justify-end card-actions">
                                        <div className="badge badge-outline badge-primary">{card.Category.Name}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ),
            )}
        </Slider>
    );
};

export default CardSlider;
