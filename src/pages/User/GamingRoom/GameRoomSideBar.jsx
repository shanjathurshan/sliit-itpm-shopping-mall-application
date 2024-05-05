import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArchiveBoxArrowDownIcon, BookmarkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../../../components/Button/Button";
import { API_URL, IMAGE_BUCKET_URL, patchMultipartData, postMultipartData } from "../../../lib/consts";

const gamingDetails = [
  {
    id: 1,
    title: "Game of throne",
    price: "Rs. 900.00",
    slot: '2-3 PM',
    date: "2024-03-12",
    image:
      "https://assets-prd.ignimgs.com/2022/01/14/gameofthrones-allseasons-sq-1642120207458.jpg"
  },
  {
    id: 2,
    title: "GTA Vice City",
    price: "Rs. 3000.00",
    slot: '3-4 PM',
    date: "2024-04-15",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/ce/Vice-city-cover.jpg"
  },
];

const GameRoomSideBar = () => {
  const [open, setOpen] = useState(false);
  const [gameList, setGameList] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bodyData = {
      userId: "65ff4f4a3f246e8f5a6efc0a",
    };

    await fetch(`${API_URL}/games/bookings/getByUserId`, {
      method: 'POST', // Use POST for sending a body
      headers: {
        'Content-Type': 'application/json', // Indicates you're sending JSON
      },
      body: JSON.stringify(bodyData), // Convert body data to JSON
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((res) => {
        console.log("res", res)
        setGameList(res);
      });

      var price = 0;
      gameList.forEach((game) => {
        price += game.gamePrice;
      });
      setPrice(price)

  };

  return (
    <>
      <div className="fl-container">
        <button
          onClick={() => setOpen(true)}
          className="p-[16px] rounded"
          style={{ background: "linear-gradient(-105deg, rgb(120 29 255) 0%, rgb(179 29 255 / 58%) 100%) 0% 0% no-repeat padding-box padding-box transparent" }}
        >

          <BookmarkIcon className="w-4 h-4" />
        </button>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[50]" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-black text-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            Booking Details History
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-200"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {gameList.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={IMAGE_BUCKET_URL + product.image}
                                      alt={IMAGE_BUCKET_URL + product.image}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-white">
                                        <h3>
                                          <a href={product.gameTitle}>
                                            {product.gameTitle}
                                          </a>
                                        </h3>
                                        <p className="ml-4">Rs. {product.gamePrice}.00</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-200">
                                      Slot: {product.booking_time} PM
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className={`rounded px-2 py-1 ${new Date(product.date) > new Date() ? 'bg-green-400 text-black' : 'bg-red-400 text-white' }`}>
                                        Date: {new Date(product.booking_date).toLocaleDateString("en-GB")}
                                      </p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-500 hover:text-indigo-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-white">
                          <p>Total amount you spend</p>
                          <p>Rs. {price}.00</p>
                        </div>
                       
                       
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default GameRoomSideBar;
