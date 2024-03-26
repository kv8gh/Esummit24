
import { jwtVerify } from 'jose';

export  async function getTokenDetails(token) {

  try {
    
    if (!token) {
      return 'Token is null'
      throw "Token is null"
    }

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );

    const userId = tokenDetails.payload._id;

    return userId;

  } catch (err) {
    console.log('Error: ', err);
  }
}
