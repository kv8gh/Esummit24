import time from '@/constant/round0/time';
import { connectMongoDB } from "@/lib/mongodb";
import { Round0 } from "@/models/round0.model";
import { Event1Test } from "@/models/event1Test.model";
import { getTokenDetails } from "@/utils/authuser.js";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await connectMongoDB();
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(' ')[1];
  let userId = await getTokenDetails(auth);
  const teamId = await Round0.findOne({ _id: userId })
  console.log('dffffff',teamId);
  // const qualTeam = await Round0.findOne({ teamName: "Karan" });
  // const teamId = qualTeam.teamId;
    try {

      const qualTeam = await Round0.findOne({ teamId: teamId });
      console.log('dddddddddddddddddddddddddddddddddddddd',qualTeam);
      if (!qualTeam) {
        return NextResponse.json({ message: 'Team not found' },{status:400});
      }
      const {answer} = await req.json();
      // const answerData = req.body.answer;
      console.log('answerData', answer);
      const teamData = await Round0.findOne({ teamId: teamId });
      const questionPointer = teamData.questionPointer;
      const easyOrder = teamData.easyOrder;
      const mediumOrder = teamData.mediumOrder;
      const hardOrder = teamData.hardOrder;
      const easyAnswers = teamData.easyAnswers;
      const mediumAnswers = teamData.mediumAnswers;
      const hardAnswers = teamData.hardAnswers;
      const caseStudyAnswers = teamData.caseStudyAnswers;
      // const endTime = teamData.endTime;
      // if(endTime < Date.now()){
      //   await Round0.findOneAndUpdate(
      //     { teamId: teamId },
      //     {
      //       questionCategory: "waiting",
      //     }
      //   );
      //   return NextResponse.json({ message: 'Time is up' },{status:400});
      // }

      let questionCategory = teamData.questionCategory;
      let newQuestionPointer = questionPointer;

      console.log('easy-------', easyAnswers);
      console.log('medium-------', easyOrder);
      console.log('medium-------', questionPointer);
      if (questionCategory === 'easy') {
        easyAnswers[easyOrder[questionPointer]] = answer;
      } else if (questionCategory == 'medium') {
        mediumAnswers[mediumOrder[questionPointer]] = answer;
      } else if (questionCategory == 'hard') {
        hardAnswers[hardOrder[questionPointer]] = answer;
      } else if (questionCategory == 'caseStudy') {
        caseStudyAnswers[questionPointer] = answer;
      }

      if (questionCategory === 'easy' && questionPointer === 9) {
        newQuestionPointer = 0;
        questionCategory = 'medium';
      } else if (
        questionCategory === 'medium' &&
        questionPointer === 7
      ) {
        newQuestionPointer = 0;
        questionCategory = 'hard';
      } else if (
        questionCategory === 'hard' &&
        questionPointer === 7
      ) {
        newQuestionPointer = 0;
        questionCategory = 'caseStudy';
      } else if (
        questionCategory === 'caseStudy' &&
        questionPointer === 3
      ) {
        newQuestionPointer = 0;
        questionCategory = 'waiting';
      } else if (questionCategory == 'waiting') {
        return NextResponse.json({ message: 'Qualifier round is completed.' },{status:400});
      } else {
        newQuestionPointer = questionPointer + 1;
      }

      await Round0.findOneAndUpdate(
        { teamId: teamId },
        {
          questionPointer: newQuestionPointer,
          questionCategory: questionCategory,
          easyAnswers: easyAnswers,
          mediumAnswers: mediumAnswers,
          hardAnswers: hardAnswers,
          caseStudyAnswers: caseStudyAnswers,
        }
      );
      return NextResponse.json({ message: 'Answer submitted' },{status:200});
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        {message: 'Internal server error',
        error: err.toString()},
        {status:500}
      );
    }
  }

// 10 easy, 8 med, 4 hard, 4cs
