
import Link from "next/link";
import UserInfo from "../components/UserInfo";

export default function Home() {
  return (

    <div className="flex flex-col">
      <Link href="/events/event1"> Go to Event 1</Link>
      <Link href="/events/event2"> Go to Event 2</Link>
      <Link href="/events/event3"> Go to Event 3</Link>
      <Link href="/events/event4"> Go to Event 4</Link>
      <Link href="/events/event5"> Go to Event 5</Link>
      <Link href="/events/event6"> Go to Event 6</Link>
      <Link href="/events/event7"> Go to Event 7</Link>
    </div>

  )
} 
   