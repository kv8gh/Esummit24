import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { jwtVerify } from 'jose';

export  async function getTokenDetails(token) {
  try {
    connectMongoDB();
    const tokenDetails = await jwtVerify(
      
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );

    const userId = tokenDetails.payload._id;

    return userId;

  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}
