import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { Event2Model } from "@/models/event2Model";

export async function POST(req){
    try{
        console.log('gsdgasfgdfgafhadfhgadfghadfh');
        // const {name} = await req.json(); 
        // console.log(name);
       
    return NextResponse.json({message:"ok",status:200});
    }
    catch(err){
        console.error("An error occurred:", err);
        return NextResponse.json({ message: "Error occurred ", status: 500 });
    }
}

// exports.makeTeam = (async (req, res, next) => {

//     console.log(req.user._id);
//     const user = await User.findById({ _id: req.user._id });

//     //check whether teamname already taken
//     const team = await Team.findOne({ teamName: req.body.teamName });
//     if (team) {
//         // return next(
//         //     new AppError("TeamName Already Exists", 412, errorCodes.TEAM_NAME_EXISTS)
//         // );
//         return res.status(401).json({
//             message: "TeamName Already Exists"
//         })
//     }

//     //if user is already in a team
//     if (user.teamId || user.teamRole) {
//         // return next(
//         //     new AppError(
//         //         "User Already Part of a Team",
//         //         412,
//         //         errorCodes.USER_ALREADY_IN_TEAM
//         //     )
//         // );
//         return res.status(401).json({
//             message: "User Already Part of a Team"
//         })
//     }


//     const newTeam = await new Team({
//         teamName: req.body.teamName,
//         teamLeaderId: req.user._id,
//         members: [req.user._id],
//     }).save();

//     await User.updateMany(
//         { _id: req.user._id },
//         { $set: { teamId: newTeam._id, teamRole: teamRole.LEADER } }
//     );

//     return res.status(201).json({
//         message: "New Team Created Successfully",
//         // teamId: newTeam._id,
//     });

//});