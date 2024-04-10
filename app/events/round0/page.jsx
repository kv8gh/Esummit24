'use client'
import Loader from "@/components/Loader";
import AnswerForQualifier from "@/components/Qualifier/AnswerForQualifier";
import Instructions from "@/components/Qualifier/Instructions";
import QuestionForQualifier from "@/components/Qualifier/QuestionsForQualifier";
import QuizEnd from "@/components/Qualifier/QuizEnd";
import Waiting from "@/components/Qualifier/Waiting";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";

export default function Qualifier() {
  const [questionCategory, setQuestionCategory] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [chronoNumber, setChronoNumber] = useState(0);
  const [teamName, setTeamName] = useState('');
  const [finalAnswer, setFinalAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      getQuestionData();
    }
  }, [status]);

  const handleSubmit = async() => {
    setIsLoading(true);
    console.log('submit button is clicked');
    console.log(finalAnswer);
    try {
       const response = await fetch("/api/round0/submitAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({
          answer:finalAnswer
        })
      });
      if(response.ok){
        console.log(response);
        // location.reload();
        setIsLoading(false);
        getQuestionData();
      }else{
        console.log('error');
        setIsLoading(false);
      }
      
    } catch (error) {
      toast.error("Server Error");
    }
  };


  const getQuestionData = () => {
    console.log('hello')
    setIsLoading(true);

    fetch(`/api/round0/getQuestionData`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data',data)
        setQuestionCategory(data.category);
        console.log('category',questionCategory);
        setQuestionNumber(data.questionNumber);
        console.log('questionNumber',questionNumber);
        setChronoNumber(data.chronoNumber);
        console.log('chronoNumber',chronoNumber);
        setTeamName(data.teamName);
        console.log('questionCategory',questionCategory);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <main className="min-h-screen pt-[5rem] bg-[#0e0e0e]">
    <section>
    {isLoading&& <Loader />}
      <div className="">
      {questionCategory === "instruction" && <Instructions />}
      {questionCategory !== "instruction" && questionCategory !== "waiting" && (
        <div className="bg-[#0e0e0e] ">
          <QuestionForQualifier
            questionCategory={questionCategory}
            questionNumber={questionNumber}
            chronoNumber={chronoNumber}
            setChronoNumber={setChronoNumber}
            setQuestionNumber={setQuestionNumber}
          />
          <AnswerForQualifier
            questionCategory={questionCategory}
            questionNumber={questionNumber}
            chronoNumber={chronoNumber}
            finalAnswer={finalAnswer}
            setChronoNumber={setChronoNumber}
            setQuestionNumber={setQuestionNumber}
            setFinalAnswer={setFinalAnswer}
          />
          <div className="w-full flex  justify-center items-center">
          {
            questionCategory==='caseStudy' && questionNumber===3 ?(
                <button
              id="nextButton"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="px-4 py-2  text-black rounded-full cursor-pointer bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] mt-4 w-1/4 md:w-1/6 h-12 hover:scale-105 transition-all flex items-center justify-center font-bold"
            >
              {isLoading ? (
                <LoadingIcons.Oval color="black" height="20px" />
              ) : (
                "Submit"
              )}
            </button>
            ):
            (
                <button
              id="submitButton"
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="px-4 py-2 text-black rounded-full cursor-pointer bg-gradient-to-br from-[#DCA64E] via-[#FEFAB7] to-[#D6993F] mt-4 w-1/4 md:w-1/6 h-12 hover:scale-105 transition-all flex items-center justify-center font-bold"
            >
              {isLoading ? (
                <LoadingIcons.Oval color="black" height="20px" />
              ) : (
                "Next"
              )}
            </button>
            )
          }

          </div>
        </div>
      )}
      {questionCategory==='waiting' && <QuizEnd/>}
      </div>
      </section>
    </main>
  );
}
