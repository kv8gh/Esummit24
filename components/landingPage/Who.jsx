import React from 'react';

export default function ResponsiveCards() {
    return (
       <div className="flex flex-col sm:flex-row justify-around items-center gap-4 m-16 text-center text-black">
         <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
           <p className="text-base">an</p>
           <h2 className="text-xl font-bold">Entrepreneur</h2>
         </div>
         <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
           <h2 className="text-xl font-bold">working with</h2>
           <p className="text-base">Startups</p>
         </div>
         <div className="card p-4 rounded-xl w-full sm:w-auto bg-[#F9DB7B]">
           <h2 className="text-xl font-bold">interested in</h2>
           <p className="text-base">Startups</p>
         </div>
       </div>
    );
   }