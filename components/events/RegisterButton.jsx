"use client";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterButton = ({ event, token, loader, setLoader }) => {
  const [userDetails, setUserDeatials] = useState(null);
  const [eventRegistered, setEventRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/userDetails", {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserDeatials(data);
        if (data.user.events) {
          if (data.user.events.includes(event)) {
            setEventRegistered(true);
          }
        }
      });
  }, []);
  const registerEvent = () => {
    if (!userDetails.user.hasFilledDetails) {
      router.push("/userDetails");
      return;
    }
    setLoader(true);
    fetch(`/api/event${event}/register`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          setEventRegistered(true);
          // console.log('\n\n\nshowing toast\n\n\n')
          toast.success("Event Registered Successfully.");
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        toast.error("Something went wrong.");
      });
  };
  const deregisterEvent = () => {
    if (!userDetails.user.hasFilledDetails) {
      router.push("/userDetails");
      return;
    }
    setLoader(true);
    fetch(`/api/event${event}/deregister`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.status === 200) {
          setLoading(false);
          setEventRegistered(false);
          toast.success("Event Deregistered Successfully.");
        } else if (res.status === 400) {
          toast.error("Delete the existing Team first");
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        toast.error("Something went wrong.");
      });
  };
  return (
    <>
      <Toaster />
      <button
        className="text-black font-semibold hover:scale-105 transition-all bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] p-2 rounded-lg hover:bg-opacity-80"
        disabled={loading || loader}
        onClick={() => {
          if (eventRegistered) {
            deregisterEvent();
          } else {
            registerEvent();
          }
        }}
      >
        {loading || !userDetails
          ? "loading..."
          : eventRegistered
          ? "Deregister"
          : "Register"}
      </button>
    </>
  );
};

export default RegisterButton;
