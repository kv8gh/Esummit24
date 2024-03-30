import Image from "next/image";
import scheduleDetails from "./scheduleDetails";
import { motion } from "framer-motion";

export default function Schedule() {
  return (
    <section className="bg-black min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="uppercase mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          schedule
        </h1>
        <p className="w-2/3 text-sm md:text-md  text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. z
        </p>
      </div>
      <div className="flex flex-col justify-center items-center m-2">
        {scheduleDetails.map((ele, index) => {
          return (
            <div key={ele} className="flex justify-center items-center">
              <div className="hidden md:flex flex-col md:flex-row w-3/4 justify-evenly text-white mb-4 m-2 md:m-8 md:p-2 items-center">
                {index % 2 === 0 && (
                  <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5 rounded-lg overflow-hidden">
                    <Image
                      className="object-fit max-h-full"
                      src={ele.image}
                      alt={"Event: " + ele.eventName}
                    />
                  </div>
                )}
                <motion.div
                  initial={{ opacity: 0, translateY: 100 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-1/2 text-wrap m-2 md:m-0"
                >
                  <div className="text-sm md:text-xl font-bold">{ele.date}</div>
                  <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
                    {ele.eventName}
                  </div>
                  <p className="font-extralight">{ele.description}</p>
                  <p className="font-extralight my-1">
                    <span className="font-normal">Venue: </span>
                    {ele.venue}
                  </p>
                </motion.div>
                {index % 2 !== 0 && (
                  <div className="border-2 border-solid border-yellow-500 h-1/6 md:h-1/5 rounded-lg overflow-hidden">
                    <Image
                      className="object-fit max-h-full"
                      src={ele.image}
                      alt={"Event: " + ele.eventName}
                    />
                  </div>
                )}
              </div>
              {/* For smaller screens */}
              <div className="md:hidden border-2 border-solid border-yellow-500 w-fit rounded-lg overflow-hidden h-44 mt-10">
                <Image
                  className="object-fit h-full"
                  src={ele.image}
                  alt={"Event: " + ele.eventName}
                />
              </div>
              <div className="md:hidden w-1/2 text-wrap text-center m-2 mt-5">
                <div className="text-sm md:text-xl font-bold">{ele.date}</div>
                <div className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-transparent bg-clip-text">
                  {ele.eventName}
                </div>
                <p className="font-extralight">{ele.description}</p>
                <p className="font-extralight my-1">
                  <span className="font-normal">Venue: </span>
                  {ele.venue}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
