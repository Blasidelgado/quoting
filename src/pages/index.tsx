import { Inter } from 'next/font/google';
import { connectToDatabase, isConnectedToDatabase } from '../../lib/mongodb';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ isConnected }: {isConnected : boolean}) {
  return (
      <h1 className='text-3xl'>{isConnected ? 'Base de datos conectada' : 'No se pudo conectar'}</h1>
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