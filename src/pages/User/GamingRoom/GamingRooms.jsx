import React from "react";
import Button from "../../../components/Button/Button";

const GamingRooms = () => {

    const games = [
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        },
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        },
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        },
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        },
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        },
        {
            title: 'GTA Vice City',
            price: 320,
            players: '2-4 players',
            image: '/images/tom-clancy-ghost-recon.jpeg'
        }
    ]

  return (
    <div className="fl-container text-white py-10 pt-20 pb-32">
      <h1 className="text-3xl font-extrabold  text-center">
        Most Popular Games
      </h1>

      <div className="grid grid-cols-3 gap-10 mt-10">

        {games.map((game, index) => (
            <div className="col-span-1" key={index}>
            <div className="bg-[#2c2c2c] rounded-lg">
              <img
                src={game.image}
                alt="GTA Vice City"
                className="w-full rounded-lg"
              />
              <div
                className="p-5"
                style={{
                  background: "rgb(217 0 255 / 18%)",
                  boxShadow: "rgb(0 94 255 / 26%) 0px 4px 100px 20px inset",
                  backdropFilter: "blur(10rem)",
                }}
              >
                <h2 className="text-xl font-bold">{game.title}</h2>
                <p className="text-gray-300 mt-2 font-thin">
                  <span className=" text-md font-bold text-[#27ff00]">{game.price}$ per hour</span>, {game.players}
                </p>
                <Button
                bgColor="white"
                textColor="black"
                hoverColor="linear-gradient(-105deg, rgb(120 29 255) 0%, rgb(179 29 255 / 58%) 100%) 0% 0% no-repeat padding-box padding-box transparent"
                 className=" mt-4 w-full rounded-lg text-sm px-5 py-2.5 text-center">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}


      </div>
    </div>
  );
};

export default GamingRooms;
