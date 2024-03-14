import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user';
import { NextResponse } from 'next/server';

import { getTokenDetails } from '../../../../utils/authuser';
import { getToken } from 'next-auth/jwt';
import { Event1 } from '@/models/event1.model';

export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : null;
    let userId = await getTokenDetails(auth);
    console.log(userId);

    const user = await Users.findById({ _id: userId });

    console.log(user);

    const { teamName } = await req.json();
    const team = await Event1.findOne({ teamName: teamName });
    if (team) {
      return NextResponse.json({
        message: 'Team Already registered ',
        status: 200,
      });
    }

    const newTeam = await new Event1({
      teamName: teamName,
      teamLeaderId: userId,
      members: [userId],
    }).save();

    await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: { teamId: newTeam._id, teamRole: 0 } }
    );

    return NextResponse.json({
      message: 'Team Details entered ',
      status: 200,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json({
      message: 'Error occurred ',
      status: 500,
    });
  }
}
