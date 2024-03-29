import { motion } from "framer-motion";
export default function Sponsors() {
  return (
    <section className="mx-10 md:mx-20">
      <div className="flex items-center mt-10 mb-5 text-center">
        <h1 className="uppercase w-fit text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          sponsors
        </h1>
        <div className="w-full">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true, delay: 0.5 }}
            className="hidden md:block h-0.5 w-full ml-8 bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
          ></motion.div>
        </div>
      </div>
      <div className="h-[50vh]"></div>
    </section>
  );
}
