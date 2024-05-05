import { Fragment, useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/Button/Button";
import { API_URL, IMAGE_BUCKET_URL, patchMultipartData, postMultipartData } from "../../../lib/consts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const product = {
  name: "Basic Tee 6-Pack ",
  price: "$192",
  rating: 3.9,
  sizes: [
    { name: "2-3", inStock: true },
    { name: "3-4", inStock: true },
    { name: "4-5", inStock: true },
    { name: "5-6", inStock: true },
    { name: "6-7", inStock: true },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const GamingRoomPopupCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  // const [onDate, setOnDate] = useState(new Date());
  const [validateMessage, setValidateMessage] = useState("");
  const [datas, setDatas] = useState(data);
  const [gameSlots, setGameSlots] = useState(product.sizes);

  const [formData, setFormData] = useState({
    gameId: data._id,
    userId: "65ff4f4a3f246e8f5a6efc0a",
    booking_time: "",
    booking_date: new Date(),
  });

  useEffect(() => {
    reFetchBookingData(new Date());
  }, []);

  const onChangeDate = e => {
    // setOnDate(e.target.value);
    console.log(e.target.value)
    setFormData({
      ...formData,
      booking_date: e.target.value,
    });

    reFetchBookingData(e.target.value);
  };

  const reFetchBookingData = async (date) => {
    const bodyData = {
      gameId: data._id, // Example game ID
      booking_date: date, // Example booking date
    };
    await fetch(`${API_URL}/games/bookings/getByDate`, {
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
        console.log(res)

          const updatedSlots = gameSlots.map((slot) => {
            const bookingMatch = res.some(
              (booking) => booking.booking_time === slot.name
            );
            return bookingMatch ? { ...slot, inStock: false } : { ...slot, inStock: true };
          });
          setGameSlots(updatedSlots);

        // setGameList(res);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.booking_time) {
      setValidateMessage("Please select a slot*");
      return;
    }
    setValidateMessage("");

    await fetch(`${API_URL}/games/bookings`, {
      method: 'POST', // Use POST for sending a body
      headers: {
        'Content-Type': 'application/json', // Indicates you're sending JSON
      },
      body: JSON.stringify(formData), // Convert body data to JSON
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((res) => {
        console.log(res)
        toast("Gameing room booked successfully!");
        setFormData({ gameId: data._id, userId: "65ff4f4a3f246e8f5a6efc0a", booking_time: null, booking_date: new Date() })
        setTimeout(() => {
          setOpen(false)
        }, 1000);
        reFetchBookingData(new Date());
      });

    // console.log(formData);

  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        bgColor="white"
        textColor="black"
        hoverColor="linear-gradient(-105deg, rgb(120 29 255) 0%, rgb(179 29 255 / 58%) 100%) 0% 0% no-repeat padding-box padding-box transparent"
        className=" mt-4 w-full rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Book Now
      </Button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <ToastContainer position="bottom-right"/>

          

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img
                          src={IMAGE_BUCKET_URL + datas.image}
                          alt={datas.image}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {datas.title}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >

                          <p className="text-2xl text-gray-900">
                            Rs. {datas.price}.00
                          </p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      product.rating > rating
                                        ? "text-gray-900"
                                        : "text-gray-200",
                                      "h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <a
                                href="#"
                                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                2-4 players
                              </a>
                            </div>
                          </div>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                        <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Choose the date 
                                </h4>
                                <span className="text-red-500">{validateMessage}</span>
                              </div>

                          <form onSubmit={handleSubmit}>
                            <div className="relative">
                              <input
                                type="date"
                                name="date"
                                id="date"
                                value={formData.booking_date}
                                onChange={onChangeDate}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full ps-6 p-2.5"
                                placeholder="Select date"
                                min={new Date().toISOString().split('T')[0]}
                                required
                              />
                              <div className="absolute inset-y-0 end-0 flex items-center p-3.5 pointer-events-none">
                                <svg
                                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                              </div>
                            </div>

                            {/* Sizes */}
                            <div className="mt-6">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">
                                  Choose the slot 
                                </h4>
                                <span className="text-red-500">{validateMessage}</span>
                              </div>

                              <RadioGroup
                                value={selectedSize}
                                onChange={(val) => {
                                  setFormData({
                                    ...formData,
                                    booking_time: val.name,
                                  });
                                  setSelectedSize(val);
                                }}
                                className="mt-3"
                              >

                                <div className="grid grid-cols-4 gap-4">
                                  {gameSlots.map((size) => (
                                    <RadioGroup.Option
                                      key={size.name}
                                      value={size}
                                      disabled={!size.inStock}
                                      className={({ active }) =>
                                        classNames(
                                          size.inStock
                                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                                          active
                                            ? "ring-2 ring-indigo-500"
                                            : "",
                                          "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">
                                            {size.name}
                                          </RadioGroup.Label>
                                          {size.inStock ? (
                                            <span
                                              className={classNames(
                                                active ? "border" : "border-2",
                                                checked
                                                  ? "border-indigo-500"
                                                  : "border-transparent",
                                                "pointer-events-none absolute -inset-px rounded-md"
                                              )}
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <span
                                              aria-hidden="true"
                                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                              <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                              >
                                                <line
                                                  x1={0}
                                                  y1={100}
                                                  x2={100}
                                                  y2={0}
                                                  vectorEffect="non-scaling-stroke"
                                                />
                                              </svg>
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>

                            <button
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Book the room
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default GamingRoomPopupCard;
