import Marquee from "react-fast-marquee";
import star from "@/public/assets/landingPage/footer/star.svg";
import Image from "next/image";
const Star = () => {
  return (
    <div className="flex items-center">
      <Image className="h-6" src={star} />
    </div>
  );
};
const Marq = () => {
  return (
    <div>
      <Marquee speed={100} className="bg-white">
        <div className="flex gap-10 bg-white text-black justify-around font-bold text-lg md:text-3xl leading-normal">
          &nbsp;
          <Star />
          &nbsp;We Breed Business&nbsp;
          <Star />
          &nbsp;We Breed Business&nbsp;
          <Star />
          &nbsp;We Breed Business
          <Star />
          &nbsp;We Breed Business
          <Star />
          &nbsp;We Breed Business
        </div>
      </Marquee>
    </div>
  );
};

export default Marq;
