import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model.js';
import { getTokenDetails } from '@/utils/authuser.js';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectMongoDB();

    // this is how you get the token from the request. DONT TOUCH!
    const token = await getToken({req});
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    const { regNo, mobNo } = await req.json();
    console.log('regNo', regNo, mobNo);

    await Users.findByIdAndUpdate(userId, {
      $set: { regNo: regNo, mobNo: Number(mobNo), hasFilledDetails: true},
    });

    return NextResponse.json({
      message: 'User Details entered ',
      status: 200,
    });
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json({
      message: 'Error occurred '}, {status:500});
  }
}

export async function GET(req) {
  try {
    await connectMongoDB();

    // this is how you get the token from the request. DONT TOUCH!
    const token = await getToken({req});
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    const user = await Users.findById(userId);

    return NextResponse.json({
      user: user,
      status: 200,
    });
  } catch (error) {
    console.log('An error occurred:', error);
    return NextResponse.json({
      message: 'Error occurred '}, {status:500});
  }
}
