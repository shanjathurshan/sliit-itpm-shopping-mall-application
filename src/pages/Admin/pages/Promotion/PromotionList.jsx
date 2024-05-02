
import React, { useState } from "react";
import GameBookingCancel from "../GamingRoomBookings/GameBookingCancel";
import { PrinterIcon } from "@heroicons/react/24/outline";

const PromotionList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOnDelete = (id) => {
        console.log("delete data:", isModalOpen);

        // API will be here

        return false;
    };

    const tableData = [
        {
            id: 1,
            title: "GTA Vice City VII",
            discount: "10%",
            startdate: "2024-04-12 12:00 PM",
            enddate: "2024-04-12 12:00 PM"
        }
    ];

    return (
        <div>
            <div className="flex items-center justify-between pb-5">
                <h1 className="text-2xl font-semibold text-gray-800 default:text-white">
                    Promotion List
                </h1>

            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div style={{ float: 'right', marginRight: '20px', marginBottom: '10px' }}>
                    <button onClick={() => { window.location.replace("/admin/promotion-add") }} style={{ backgroundColor: 'black', color: 'white', padding: '5px' }}>
                        Add New
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 default:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 default:bg-gray-700 default:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-6">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-6">
                                Start Date
                            </th>
                            <th scope="col" className="px-6 py-6">
                                End Date
                            </th>
                            <th scope="col" className="px-6 py-6 text-red-500 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b default:bg-gray-800 default:border-gray-700 hover:bg-gray-50 default:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{data.title}</td>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap default:text-white"
                                >
                                    {data.discount}
                                </th>
                                <td className="px-6 py-4">{data.startdate}</td>
                                <td className="px-6 py-4">{data.enddate}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-center">
                                        <GameBookingCancel
                                            isOpen={isModalOpen}
                                            toggleModal={toggleModal}
                                            onDetele={() => handleOnDelete(1)}
                                        />
                                        <button
                                            onClick={() => window.location.replace('/admin/promotion-qr-code/1')}
                                            className="text-white bg-green-500 ms-5 p-2 rounded"
                                        >
                                            <PrinterIcon className="w-4 h-4" />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PromotionList;
