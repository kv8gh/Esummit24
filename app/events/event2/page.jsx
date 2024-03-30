"use client"

import RegisterButton from '@/components/events/RegisterButton';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('uussee');
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      getUserData();
      // fetchDataFromBackend();
    }
  }, [status, router]);

  const getUserData = () => {
    setIsLoading(true);

    fetch(`/api/userDetails`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        if (user.hasFilledDetails == true) {
          setIsLoading(false);
        } else {
          router.push('/userDetails');
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <div>
      Event2 Landing Page
      <br></br>
      info about Event2
      <br></br>

      <RegisterButton event={2} token={session?.accessTokenBackend}/>

    </div>
  );
}
