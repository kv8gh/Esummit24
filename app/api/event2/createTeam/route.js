import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { NextResponse } from 'next/server';

import { Event2 } from '@/models/event2.model';
import { getToken } from 'next-auth/jwt';
import { getTokenDetails } from '../../../../utils/authuser';

export async function POST(req) {
  try {
    await connectMongoDB();

    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    const user = await Users.findById({ _id: userId });

    const { teamName } = await req.json();
    const team = await Event2.findOne({ teamName: teamName });
    if (team) {
      return NextResponse.json({
        message: 'Team Already registered',
        status: 405,
      });
    }

    const newTeam = await new Event2({
      teamName: teamName,
      teamLeaderId: userId,
      members: [userId],
    }).save();

    await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: { event2TeamId: newTeam._id, event2TeamRole: 0 } }
    );

    return NextResponse.json({
      message: 'Team Details entered ',
      status: 200,
    });
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json({
      message: 'Error occurred '}, {status:500});
  }
}
