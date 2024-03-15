import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { NextResponse } from 'next/server';

import { Event1 } from '@/models/event1.model';
import { getToken } from 'next-auth/jwt';
import { getTokenDetails } from '../../../../utils/authuser';

export async function GET(req) {
    try {
        await connectMongoDB();

        const token = await getToken({ req });
        const auth = token ? token.accessTokenFromBackend : null;
        let userId = await getTokenDetails(auth);
        console.log('dddddd', userId);

        const user = await Users.findById({ _id: userId });

        if (!user) {
            return NextResponse.json({ message: 'User Not found' });
        }
        console.log(user);

        const teamId = user.event1TeamId;
        const team = await Event1.findById(teamId).populate('members');
        console.log("^^^^^^",team);
        if (!team) {
            return NextResponse.json({ message: 'Team is not there ' });
        }
    
        return NextResponse.json({
            message: 'Team Details sent. ',
            status: 200,
            teamDetails: team,
        });
    } catch (error) {
        console.error('An error occurred:', error);
        return NextResponse.json({
            message: 'Error occurred ',
            status: 500,
        });
    }
}
