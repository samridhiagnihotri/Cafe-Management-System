import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto p-3 min-h-[83vh] grid md:grid-cols-2 gap-y-10">
        <div className="flex justify-center items-start flex-col h-full">
          <h1 className="text-3xl md:text-4xl bg-gradient-to-r from-pink-600 to-pink-300 bg-clip-text text-transparent font-bold tracking-wider mb-2">
            Life's too short to drink bad coffee,
          </h1>
          <p className="text-pink-100 opacity-70 mt-3 text-xl font-semibold mb-2">
            Order the best coffee online from{" "}
            <br></br>
            <span className="text-pink-400 font-bold text-3xl ml-1 logo">
              Bean there ,done that  
            </span>
              <br></br>
               whenever and wherever you like!”
          </p>
          <br></br>
          <Link href={"/foods"}>
            <button className="hover:bg-pink-400 hover:text-white bg-pink-200 text-pink-700 tracking-widest transition duration-300 ease-in-out font-bold p-3 rounded-lg cursor-pointer mt-4">
              Order Now
            </button>
          </Link>
        </div>
        <div className="h-full flex justify-center items-center">
          <img
            src="/pic6.jpeg"
            alt=""
            className="md:h-[700px] sm:h-[300px] h-60 object-fill"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
