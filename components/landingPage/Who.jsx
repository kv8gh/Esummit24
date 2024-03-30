import React from "react";

export default function ResponsiveCards() {
  return (
    <section className="bg-black mx-20 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold capitalize text-center">This Event is For You if you are...</h1>
      <div className="flex flex-col sm:flex-row justify-evenly w-full items-center gap-10 m-16 text-center text-black">
        <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
          <p className="text-base">an</p>
          <h2 className="text-xl font-bold">Entrepreneur</h2>
        </div>
        <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
          <h2 className="text-xl font-bold">working with</h2>
          <p className="text-base">Startups</p>
        </div>
        <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
          <h2 className="text-xl font-bold">interested in</h2>
          <p className="text-base">Startups</p>
        </div>
      </div>
    </section>
  );
}
