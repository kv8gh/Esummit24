import Image from "next/image";
import actuate from "@/public/assets/landingPage/IIA/actuate.svg";
import ideate from "@/public/assets/landingPage/IIA/ideate.svg";
import innovate from "@/public/assets/landingPage/IIA/innovate.svg";
const IIACard = ({img, title, description}) => {
  return (
    <div className="flex text-white h-auto items-center gap-4 w-80 my-10">
      <Image className="h-10 w-auto" src={img} />
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">{title}</h1>
        <p className="font-light">
         {description}
        </p>
      </div>
    </div>
  );
};

export default IIACard;
