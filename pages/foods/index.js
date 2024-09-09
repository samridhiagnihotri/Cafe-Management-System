import React, { useEffect } from "react";
import Link from "next/link";

const foods = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 max-w-6xl mx-auto p-3 min-h-[83vh]">
        <div className="flex flex-col items-center justify-center p-3">
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/hotbeverage"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Hot Beverage</h1>
              </div>
            </Link>
            <Link href={"/foods/coldbeverage"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Cold Beverage</h1>
              </div>
            </Link>
          </div>
        
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/pasta"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Pasta</h1>
              </div>
            </Link>
            <Link href={"/foods/sides"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Sides</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center justify-evenly w-full mb-5">
            <Link href={"/foods/desserts"}>
              <div className="bg-gray-800 rounded-xl p-4 px-6 sm:px-10 md:px-16 hover:scale-110 transition duration-500 ease-in font-bold cursor-pointer">
                <h1>Desserts</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="items-center justify-center hidden md:flex">
          <img
            src="/coffee.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default foods;
