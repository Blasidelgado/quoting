import Image from 'next/image';
import { Inter } from 'next/font/google';
import { connectToDatabase, isConnectedToDatabase } from '../../lib/mongodb';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ isConnected }: {isConnected : boolean}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1>{isConnected ? 'Base de datos conectada' : 'No se pudo conectar'}</h1>
    </main>
  )
}

export async function getServerSideProps() {
  
  connectToDatabase();

  return {
    props: {
      isConnected: isConnectedToDatabase(),
    }
  }
}