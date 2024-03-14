import { connectMongoDB } from '@/lib/mongodb';
import { Users } from '@/models/user.model';
import { jwtVerify } from 'jose';

export  async function getTokenDetails(token) {
  try {
    connectMongoDB();
    console.log("fsdaghjgdshbfzhjdbvsjhbdfhjcbghjgfd")
    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)
    );


    const teamId = tokenDetails.payload._id;
    console.log(teamId)

    const user = await Users.findById(teamId);

   
    return teamId;

  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}
