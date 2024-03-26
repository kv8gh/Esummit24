"use client";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const RegisterButton = ({ event, token }) => {
  const [userDetails, setUserDeatials] = useState(null);
  const [eventRegistered, setEventRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        if (res.status === 200) {
          setLoading(false);
          setEventRegistered(true);
          toast.success("Event Registered Successfully.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong.");
      });
  };
  const deregisterEvent = () => {
    setLoading(true);
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
        if (res.status === 200) {
          setLoading(false);
          setEventRegistered(false);
          toast.success("Event Deregistered Successfully.");
        } else if (res.status === 400) {
          setLoading(false);
          toast.error('Delete the existing Team first');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error("Something went wrong.");
      });
  };
  return (
    <>
      <Toaster />{" "}
      <button
        className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
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
