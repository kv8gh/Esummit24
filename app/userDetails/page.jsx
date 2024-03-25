"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UserDetails() {
  const { data: session, status } = useSession();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [mobNo, setMobNo] = useState("");
  const [regError, setRegError] = useState(true);
  const router = useRouter();

  const handleFirstnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ""); // Allow only alphabets
    setFirstName(inputValue);
  };

  const handleLastnameChange = (e) => {
    const inputValue = e.target.value.replace(/[^a-zA-Z]/g, ""); // Allow only alphabets
    setLastName(inputValue);
  };

  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Allow Only numbers
    setMobNo(inputValue.trim());

    // if (isValidInput || input === '') {
    //   setUserPhoneNumber(input);
    //   setPhoneError(''); // Reset error state
    // } else {
    //   setPhoneError('Invalid Phone Number'); // Set error state
    // }
  };

  const handleRegNo = (e) => {
    const inputValue = e.target.value;
    setRegNo(inputValue.toUpperCase());
    
    
  };

  const handleSubmit = async () => {
    console.log("button ");
    console.log(firstName);
    console.log(lastName);

    const regNoNew = document.getElementById('regNo').value;
    const isValidInput = (/^[2][0-3][a-zA-Z]{3}\d{4}$/).test(regNoNew.trim());
    console.log(isValidInput);
    if (isValidInput) {
      setRegError(false);
      console.log(regError);
    } else {
      setRegError(true);
    }

    
    if (mobNo !== "" && regNo !== "") {
      if (mobNo.length === 10) {
        if (isValidInput && regNo.length === 9) {
          console.log(mobNo);
          console.log(regNo);
          try {
            const response = await fetch("/api/userDetails", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              Authorization: `Bearer ${session.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
              body: JSON.stringify({
                // firstName,
                // lastName,
                regNo,
                mobNo,
              }),
            });

            if (response.ok) {
              console.log("Data saved successfully");

              // setFirstName('');
              // setLastName('');
              setRegNo("");
              setMobNo("");
              toast.success("Details submitted successfully");

              router.push("/");
            } else {
              console.log("Failed to save data:", response.statusText);
              toast.error("Failed to save data");
            }
          } catch (error) {
            console.log("Error saving data:", error);
            toast.error("Server Error");
          }
        } else {
          toast.error("Please give valid registration number");
        }
      } else {
        toast.error("Please give valid mobile number");
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center gap-6">
      {/* <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstnameChange}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastnameChange}
          style={{ color: "black" }}
        />
      </div> */}
      <div>
        <label htmlFor="regNo">Registration Number:</label>
        <input
          type="text"
          id="regNo"
          value={regNo}
          onChange={handleRegNo}
          style={{ color: "black" }}
        />
      </div>
      <div>
        <label htmlFor="mobNo">Mobile Number:</label>
        <input
          type="text"
          id="mobNo"
          value={mobNo}
          onChange={handlePhoneNumber}
          style={{ color: "black" }}
        />
      </div>
      <button onClick={() => handleSubmit()} className="bg-blue border border-black rounded-lg p-3">Submit</button>
      <Toaster />
    </div>
  );
}
