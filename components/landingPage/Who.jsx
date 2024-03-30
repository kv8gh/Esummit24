import { motion } from "framer-motion";
export default function ResponsiveCards() {
  return (
    <section className="bg-black mx-10 sm:mx-20 md:mx-36 lg:mx-64 md:mb-20 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold capitalize text-center">
        This Event is For You if you are...
      </h1>
      <div className="sm:relative flex flex-col sm:flex-row justify-evenly w-full items-center gap-10 m-16 text-center text-black">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80%" }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="hidden sm:block bg-white h-1 absolute top-[calc(50%+3rem)] rounded-2xl"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="sm:absolute sm:top-1/2 left-0 h-24 card p-4 rounded-xl w-full sm:w-auto bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
        >
          <p className="text-base">an</p>
          <h2 className="text-xl font-bold">Entrepreneur</h2>
        </motion.div>
        <div className="sm:absolute sm:top-1/2 h-24 card p-4 rounded-xl w-full sm:w-auto bg-gradient-to-bl from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]">
          <h2 className="text-xl font-bold">working with</h2>
          <p className="text-base">Startups</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          viewport={{ once: true }}
          className="sm:absolute sm:top-1/2 h-24 right-0 card p-4 rounded-xl w-full sm:w-auto bg-gradient-to-tr from-[#DCA64E] via-[#FEFAB7] to-[#D6993F]"
        >
          <h2 className="text-xl font-bold">interested in</h2>
          <p className="text-base">Startups</p>
        </motion.div>
      </div>
    </section>
  );
}
