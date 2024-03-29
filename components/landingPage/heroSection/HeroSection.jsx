import React from "react";
import Timer from "./Timer";
import MoreButton from "./MoreButton";

const HeroSection = () => {
  return (
    <section className=" relative flex flex-col items-center justify-center min-h-screen bg-[url('/public/assets/landingPage/heroImage.png')] bg-cover">
      <h6 className="uppercase text-xl font-light">e-cell vit presents</h6>
      <h1 className="uppercase text-9xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
        e-summit&apos; 24
      </h1>
      <h1 className="uppercase text-xl font-light">
        The 5th edition of the biggest fest in South India
      </h1>
      <div className="w-full flex items-center justify-center gap-20">
        <Timer />
        <button className="p-2 rounded-xl uppercase border-2 border-[#FEFAB7]">
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
