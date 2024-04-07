import React from "react";

const page = () => {
  return (
    <section className="bg-[#0E0E0E] ">
      <div className="flex flex-col items-center justify-center h-screen max-md:overflow-scroll max-md:max-h-fit ">
        <div className="w-1/2 h-1/2 max-md:h-fit max-md:w-2/3 p-8 flex flex-col justify-around items-center bg-[#141B2B] rounded-lg border border-white">
          <p className="text-white text-xl font-bold flex max-md:align-top">
            AGREEMENT!
          </p>
          <p className="text-white flex flex-wrap max-md:text-base">
            I understand that if I do not create a team or join an existing team
            before the end of registrations, I would be added to a random team.
          </p>
        </div>
        <div className="mt-3">
          {/* {!check ?  */}
          {/* <button
            onClick = {() => {
                console.log("af")
            } }
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            I Agree
          </button> */}
          <button className="bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] text-black p-2 rounded-lg cursor-pointer hover:scale-105 font-bold">I agree</button>
          {/* : <button onClick={() => { disagreeConsent() }} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> */}
          {/* I Disgree */}
          {/* </button>} */}
        </div>
      </div>
    </section>
  );
};

export default page;
