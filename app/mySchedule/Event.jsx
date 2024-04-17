import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import {
  FaRegClock,
  FaInfoCircle,
  FaCalendarAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ScheduleRegisterButton from "@/components/events/ScheduleRegisterButton";
import Link from "next/link";

const Event = ({ event, userDetails }) => {
  const [loader, setLoader] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (event.id == 1) {
      if (!userDetails.user.event1TeamId) {
        setShowWarning(true);
      }
    }
    if (event.id == 2) {
      if (!userDetails.user.event2TeamId) {
        setShowWarning(true);
      }
    }
  }, []);
  return (
    <div>
      <div>
        {loader && <Loader />}
        <div className="">
          <h1 className="uppercase text-2xl md:text-3xl lg:text-5xl font-bold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
            {event.eventName}
          </h1>
          <div className="uppercase flex gap-2 items-center">
            <span>
              <FaCalendarAlt />
            </span>
            {event.date}
          </div>
          <div className="uppercase flex gap-2 items-center">
            <span>
              <FaRegClock />
            </span>
            {event.time}
          </div>
          <div className="uppercase flex gap-2 items-center">
            <span>
              <FaLocationDot />
            </span>
            {event.venue}
          </div>
        </div>
        <p className="font-poppins py-2">{event.description}</p>
        <div className="flex flex-col md:flex-row gap-2">
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
          {event.loc && (
            <Link
              className="text-black flex justify-center items-center gap-2 capitalize font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
              target="_blank"
              href={event.loc}
            >
              <span>
                <GrMapLocation />
              </span>
              get directions
            </Link>
          )}
          {(event.id === 1 || event.id === 2) && (
            <button className="bg-[#50CC5E] p-2 rounded-xl font-semibold">
              <Link
                className="flex items-center gap-2 justify-center"
                href={event.whatsapp}
              >
                <span className="h-full">
                  <FaWhatsapp className="p-0 m-0 text-xl" />
                </span>
                Join whatsapp group
              </Link>
            </button>
          )}
        </div>
        {showWarning && (
          <p className="bg-green-500 bg-opacity-100 flex items-center rounded-lg gap-2 p-2 my-2 w-fit">
            <span>
              <FaInfoCircle />
            </span>
            Congratulations on registering for the event! To participate, you
            must create your team by April 11 2024 consisting of 3-4 members
            only. You can create your team by going to dashboard.
          </p>
        )}
      </div>
    </div>
  );
};

export default Event;
