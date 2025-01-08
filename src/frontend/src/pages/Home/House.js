import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const House = () => {
    const [housesForSale, setHousesForSale] = useState([]); // Danh sách nhà đang bán
    const [housesForRent, setHousesForRent] = useState([]); // Danh sách nhà đang cho thuê

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bds/type?type=Nhà'); // Thêm query param type=Nhà
                const { forSale, forRent } = response.data;

                const filteredForSale = forSale
                    .filter((bds) => bds.type === 'Nhà')
                    .map((bds) => ({
                        ...bds,
                        images: bds.images.map((img) => `http://localhost:5000${img}`),
                    }));

                const filteredForRent = forRent
                    .filter((bds) => bds.type === 'Nhà')
                    .map((bds) => ({
                        ...bds,
                        images: bds.images.map((img) => `http://localhost:5000${img}`),
                    }));

                setHousesForSale(filteredForSale);
                setHousesForRent(filteredForRent);
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, []);


    return (
        <div className="p-6 mt-60 flex flex-col items-center">
            <div className="w-full max-w-screen-xl">
                {/* Nhà đang bán */}
                <h2 className="text-xl font-bold mb-6">Nhà đang bán</h2>
                {housesForSale.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                        {housesForSale.map((house) => (
                            <div
                                key={house._id}
                                className="p-4 border rounded shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-[260px]"
                            >
                                {/* Hiển thị ảnh */}
                                {house.images && house.images.length > 0 ? (
                                    <div className="mt-4">
                                        {house.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Nhà ${house.title}`}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}
                                <h3 className="font-bold">{house.title}</h3>
                                <p>{house.price.toLocaleString()} VND</p>
                                <p>
                                    <FontAwesomeIcon icon={faRulerCombined} className="text-blue-500 mr-2" />
                                    {house.area} m²
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
                                    {house.location}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có nhà nào đang bán.</p>
                )}

                {/* Nhà đang cho thuê */}
                <h2 className="text-xl font-bold mt-10 mb-6">Nhà đang cho thuê</h2>
                {housesForRent.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                        {housesForRent.map((house) => (
                            <div
                                key={house._id}
                                className="p-4 border rounded shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-[260px]"
                            >
                                {/* Hiển thị ảnh */}
                                {house.images && house.images.length > 0 ? (
                                    <div className="mt-4">
                                        {house.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`Nhà ${house.title}`}
                                                className="w-full h-48 object-cover mb-2 rounded"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}
                                <h3 className="font-bold">{house.title}</h3>
                                <p>{house.price.toLocaleString()} VND</p>
                                <p>
                                    <FontAwesomeIcon icon={faRulerCombined} className="text-blue-500 mr-2" />
                                    {house.area} m²
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
                                    {house.location}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có nhà nào đang cho thuê.</p>
                )}
            </div>
        </div>
    );
};

export default House;
