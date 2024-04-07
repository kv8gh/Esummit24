import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import ScheduleRegisterButton from "@/components/events/ScheduleRegisterButton";

const Event = ({ event }) => {
  const [loader, setLoader] = useState(false);
  const { data: session, status } = useSession();

  return (
    <div>
      <div>
        {loader && <Loader />}
        <div className="">
          <h1 className="uppercase text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
            {event.eventName}
          </h1>
          <div className="flex gap-2 items-center">
            <span>
              <FaRegClock />
            </span>
            {event.time}
          </div>
          <div className="flex gap-2 items-center">
            <span>
              <FaLocationDot />
            </span>
            {event.venue}
          </div>
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
    </div>
  );
};

export default Event;
