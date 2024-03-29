import Image from "next/image";
import scheduleDetails from "./scheduleDetails";

export default function Schedule() {
  return (
    <main className="bg-black min-h-screen w-[100vw] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="uppercase text-4xl">schedule</div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. z
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-2">
        {scheduleDetails.map((ele, index) => {
          return (
            <div className="flex w-3/4 justify-evenly text-white mb-4 m-2 md:m-8 md:p-2">
              {index % 2 === 0 && (
                <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5">
                  <Image
                    className="object-fit max-h-full"
                    src={ele.image}
                    alt={"Event: " + ele.eventName}
                  />
                </div>
              )}
              <div className="w-1/2 text-wrap m-2 md:m-0">
                <div className="text-xl">{ele.date}</div>
                <div className="text-4xl  bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
                  {ele.eventName}
                </div>
                <p>{ele.description}</p>
              </div>
              {index % 2 !== 0 && (
                <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5">
                  <Image
                    className="object-fit max-h-full"
                    src={ele.image}
                    alt={"Event: " + ele.eventName}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
