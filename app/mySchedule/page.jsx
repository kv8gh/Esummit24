"use client";
import scheduleDetails from "@/components/landingPage/Schedule/scheduleDetails";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ScheduleRegisterButton from "@/components/events/ScheduleRegisterButton";
import Loader from "@/components/Loader";

function Event({ event }) {
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
      {loader && <Loader />}
      <div className="flex items-end">
        <h1 className="uppercase text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
          {event.eventName}
        </h1>
        <h1>
          {event.time} & {event.venue}
        </h1>
      </div>
      <p className="font-poppins py-2">{event.description}</p>
      <div className="flex gap-2">
        <ScheduleRegisterButton
          loader={loader}
          setLoader={setLoader}
          event={event.id}
          token={session?.accessTokenBackend}
        />
        {(event.id === 1 || event.id === 2) && (
          <button
            className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
            onClick={() => {
              window.location.href = `/events/event${event.id}/memberDash`;
            }}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

const page = () => {
  const [regEvent, setRegEvents] = useState([1, 2, 3, 4]);
  const [regEventsList, setRegEventsList] = useState([]);
  const [userDetails, setUserDeatials] = useState(null);
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setLoader(true);
    fetch("/api/userDetails", {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDeatials(data);
        setRegEventsList(
          scheduleDetails.filter((event) =>
            data?.user?.events?.includes(event.id)
          )
        );
        // console.log(data);
      });

    setLoader(false);
  }, []);

  const events = regEventsList.map((event) => {
    return <Event event={event} />;
  });

  return (
    <section className="pt-20 text-white font-poppins px-10">
      {loader && <Loader />}
      <h1 className="uppercase text-center mt-10 mb-5 text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
        my schedule
      </h1>
      <div className="flex flex-col gap-4">{events}</div>
    </section>
  );
};

export default page;
