import React from "react";
import Image from "next/image";
import image1 from "@/styles/landingPage/image1.png";
import image2 from "@/styles/landingPage/image2.png";
import image3 from "@/styles/landingPage/image3.png";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Sponsers() {
  return (
    <div className="">
      <div className="flex flex-row">
        <p className="text-5xl text-center font-gotham-black font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text pb-10 pl-20">Meet Our Speakers</p>
        <div className="pl-10 mx-auto my-4 h-[2px] w-1/5 bg-gradient-to-r from-orange-400 via-yellow-300 to-red-400"></div>
      </div>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="w-80">
          <Image className=""src={image1} alt="sponser1" width={250} height={250} />
          <div>
            <p className="text-center text-3xl bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">Mr.XYC</p>
            <p className="text-center">Chairman, OBH Group</p>

            <div className="flex flex-row justify-evenly ">
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaLinkedin />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaTwitter />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="w-80">
          <Image src={image2} alt="sponser2" width={250} height={250} />
          <div>
            <p className="text-center text-3xl bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">Mr.XYC</p>
            <p className="text-center">Chairman, OBH Group</p>

            <div className="flex flex-row justify-evenly ">
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaLinkedin />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaTwitter />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="w-80">
          <Image src={image3} alt="sponser3" width={250} height={250} />
          <div>
            <p className="text-center text-3xl bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">Mr.XYC</p>
            <p className="text-center">Chairman, OBH Group</p>

            <div className="flex flex-row justify-evenly ">
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaLinkedin />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaTwitter />
              </a>
              <a
                href=""
                className="flex hover:text-blue-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
