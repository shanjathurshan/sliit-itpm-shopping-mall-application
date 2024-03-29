import {
  ArchiveBoxArrowDownIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import GameCenterCreate from "./GameCenterCreate";
import GameCenterDelete from "./GameCenterDelete";

const GameCenter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", amount: "" });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = (data) => {
    console.log("Form data:", data);

    // API will be here

    return false;
  };

  const handleOnDelete = (id) => {
    console.log("delete data:", isModalOpen);

    // API will be here

    return false;
  };

  const tableData = [
    {
      id: 1,
      name: "Microsoft Surface Pro",
      color: "White",
      category: "Laptop PC",
      price: "$1999",
    },
    {
      id: 2,
      name: "Apple MacBook Pro",
      color: "Silver",
      category: "Laptop PC",
      price: "$2499",
    },
    {
      id: 2,
      name: "Apple MacBook Pro",
      color: "Silver",
      category: "Laptop PC",
      price: "$2499",
    },
    {
      id: 2,
      name: "Apple MacBook Pro",
      color: "Silver",
      category: "Laptop PC",
      price: "$2499",
    },
    {
      id: 2,
      name: "Apple MacBook Pro",
      color: "Silver",
      category: "Laptop PC",
      price: "$2499",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <h1 className="text-2xl font-semibold text-gray-800 default:text-white">
          Games
        </h1>
        {/* <GameCenterCreate /> */}

        <GameCenterCreate
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          onSubmit={handleFormSubmit}
          formData={formData}
          setFormData={setFormData}
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 default:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 default:bg-gray-700 default:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-6">
                <div className="flex items-center">
                  Color
                  <a href="#">
                    <svg
                      className="w-3 h-3 ms-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-6">
                Color
              </th>
              <th scope="col" className="px-6 py-6">
                Category
              </th>
              <th scope="col" className="px-6 py-6">
                Price
              </th>
              <th scope="col" className="px-6 py-6 text-red-500 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr
                key={index}
                className="bg-white border-b default:bg-gray-800 default:border-gray-700 hover:bg-gray-50 default:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap default:text-white"
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.color}</td>
                <td className="px-6 py-4">{data.category}</td>
                <td className="px-6 py-4">{data.price}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-center">
                    <button className="text-white  bg-green-500 p-2 rounded">
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <GameCenterDelete
                      isOpen={isModalOpen}
                      toggleModal={toggleModal}
                      onDetele={()=> handleOnDelete(1)}
                    />
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

export default GameCenter;
