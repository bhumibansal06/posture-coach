import { useStore } from '@/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const postureHistory = useStore((state) => state.postureHistory);

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Posture Analytics</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={postureHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                        <XAxis dataKey="time" stroke="#a0aec0" />
                        <YAxis stroke="#a0aec0" />
                        <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#48bb78" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
