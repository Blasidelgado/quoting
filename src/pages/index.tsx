import { Inter } from 'next/font/google';
import { getSession } from 'next-auth/react';
import { connectToDatabase, isConnectedToDatabase } from '../../lib/mongodb';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ isConnected, user }: {isConnected : boolean, user}) {
  return (
      <h1 className='text-3xl'>{isConnected && `Welcome, ${user}`}</h1>
  )
}

export async function getServerSideProps(context) {
  
  connectToDatabase();

  const session = await getSession(context);
  const user = session?.user?.name; 

  return {
    props: {
      isConnected: isConnectedToDatabase(),
      user
    }
  }
}