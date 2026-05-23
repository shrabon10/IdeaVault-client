"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Profile() {
  const { data: session } = useSession();

  const data = [
    { name: "Mon", visits: 20 },
    { name: "Tue", visits: 35 },
    { name: "Wed", visits: 25 },
    { name: "Thu", visits: 50 },
    { name: "Fri", visits: 40 },
    { name: "Sat", visits: 70 },
    { name: "Sun", visits: 66 },
  ];

  const user = session?.user;

  return (
    <div className="min-h-[10vh] bg-base-200 p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Profile Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6 flex items-center gap-5">
          <Image
            src={user?.image}
            alt={user?.name}
            height={80}
            width={80}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary"
          />

          <div>
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-sm opacity-70">{user?.email}</p>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-base-100 shadow-xl rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Weekly Activity</h2>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
