import React from "react";
import Timer from "./Timer";
import MoreButton from "./MoreButton";

const HeroSection = () => {
  return (
    <section className=" relative flex flex-col items-center justify-center min-h-screen bg-[url('/assets/landingPage/heroImage.png')] bg-cover">
      <h6 className="uppercase text-sm lg:text-xl font-light">
        e-cell vit presents
      </h6>
      <h1 className="esummit uppercase text-6xl lg:text-9xl font-bold">
        e-summit&apos;24
      </h1>
      <h1 className="uppercase text-sm lg:text-xl font-light mt-5 mb-10">
        The 5th edition of the biggest fest in South India
      </h1>
      <div className="w-full flex items-center justify-center gap-20">
        <Timer />
        <button className="py-2 px-4 font-semibold rounded-xl uppercase border-4 border-[#FEFAB7] bg-transparent">
          register now!!!
        </button>
      </div>
      <div className="absolute bottom-0">
        <MoreButton />
      </div>
    </section>
  );
};

export default HeroSection;
