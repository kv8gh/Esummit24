// import { getToken } from "next-auth/jwt";
// import { withAuth } from "next-auth/middleware";
// import { getTokenDetails } from "./utils/authuser";

// export default withAuth(
//   async function middleware(req) {

//     if (req.nextUrl.pathname.startsWith('/events/event1')) {

//       // const token = await getToken({req});
//       // const auth = token ? token.accessTokenFromBackend : null;
  
//       // console.log('authtthhhhh', auth)
//       // // // let userId = await getTokenDetails(auth);
  
//       // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/userDetails`, {
//       //   content: 'application/json',
//       //   method: 'GET',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     Authorization: `Bearer ${auth}`,
//       //     'Access-Control-Allow-Origin': '*',
//       //   },
//       // })
  
//       // const data = await res.json();
//       // console.log('data', data)
      
//       // return NextResponse.rewrite(new URL('/about-2', request.url))
//     }

//     // console.log('userId', userId);
//   }
// )

// // export function middleware(request) {
// //   if (request.nextUrl.pathname.startsWith('/events/event1')) {
// //     console.log('asdf')
// //     // return NextResponse.rewrite(new URL('/about-2', request.url))
// //   }
// // }