import Link from "next/link";

export default function Page() {
  return <div>
    Event1 Landing Page
    <br></br>
    info about Event1
    <br></br>
    
    <Link href={'/events/event1/makeTeam'} className="bg-blue-500 border border-black rounded-lg p-2 m-2">Register</Link>
  </div>;
}