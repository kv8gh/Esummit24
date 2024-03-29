import Image from "next/image";
import Accordian from "./Accordian";
import { useState } from "react";
import faqImage from "@/public/assets/landingPage/FAQ/faq.svg";

const FAQ = () => {
  const [showAnsNumber, setShowAnsNumber] = useState(-1);
  const handleClick = (id) => {
    if (id === showAnsNumber) {
      setShowAnsNumber(-1);
    } else {
      setShowAnsNumber(id);
    }
  };

  const faqs = [
    {
      id: 1,
      q: "Is it compulsory to participate in a team?",
      ans: ["Yes, it is compulsory to participate as a team."],
    },
    {
      id: 2,
      q: "What is the team size?",
      ans: ["Team can consists 3 to 4 members."],
    },
    {
      id: 3,
      q: "I’m interested in participating but I’m unable to find a team. What should I do?",
      ans: ["You can register without a team, we will provide a team for you."],
    },
    {
      id: 4,
      q: "Will there be any registration fees?",
      ans: ["No, the event is free of cost."],
    },
    {
      id: 5,
      q: "Do I need to have a business idea ready?",
      ans: [
        "No, we provide support for idea development throughout the event - just bring your enthusiasm!",
      ],
    },
  ];

  const faqSection = faqs.map((questionObj) => (
    <Accordian
      key={questionObj.id}
      {...questionObj}
      handleClick={handleClick}
      showAnsNumber={showAnsNumber}
    />
  ));

  return (
    <section className="relative min-h-[80vh] w-full flex justify-center items-center">
      <div className="flex flex-col sm:flex-row gap-10 items-center w-3/4">
        <div className="w-full sm:w-1/2 flex sm:flex-col items-center gap-5 sm:gap-0">
          <div className="text-left">
            <Image className="h-44" src={faqImage} />
            <h1 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] bg-clip-text text-transparent">
              <h1>Answers To Some</h1>
              <h1>Commonly Asked Questions</h1>
            </h1>
          </div>
        </div>
        <div className="w-full sm:w-1/2 h-full flex flex-col gap-2 items-start">
          {faqSection}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
