import Head from 'next/head';
import dynamic from 'next/dynamic';
import Notifications from '@/components/Notifications';

// Dynamically import components that use browser-only APIs
const WebcamFeed = dynamic(() => import('@/components/WebcamFeed'), {
  ssr: false, // This line is the key: it disables Server-Side Rendering for this component
  loading: () => <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center h-96"><p>Loading Webcam...</p></div>
});

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr: false, // Disable SSR for the Dashboard as well, since Recharts needs the browser
  loading: () => <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex justify-center items-center h-64"><p>Loading Dashboard...</p></div>
});


export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Head>
        <title>Posture Coach 2.0</title>
        <meta name="description" content="Real-time posture correction" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8">Posture Coach 2.0</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <WebcamFeed />
          </div>
          <div>
            <Dashboard />
            <Notifications />
          </div>
        </div>
      </main>
    </div>
  );
}

