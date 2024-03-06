

import Link from "next/link";
// import { useRouter } from "next/navigation";
export default function Page() {
  // const router = useRouter();
    return <div>
      Event2 Landing Page
      <br></br>
      info about Event1
      <br></br>
      {/* <button onClick={()=>router.push( "/event2/makeTeam" )}>
        Register
      </button> */}
      <Link href={'/event2/makeTeam'}>Register</Link>
    </div>;
  }