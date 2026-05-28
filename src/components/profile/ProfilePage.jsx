"use client";

import { useSession } from "@/lib/auth-client";
import { Activity, Mail } from "lucide-react";
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
  const user = session?.user;

  const data = [
    { name: "Mon", visits: 20 },
    { name: "Tue", visits: 35 },
    { name: "Wed", visits: 25 },
    { name: "Thu", visits: 50 },
    { name: "Fri", visits: 40 },
    { name: "Sat", stroke: 70, visits: 70 },
    { name: "Sun", visits: 66 },
  ];

  return (
    <div className="min-h-[5vh] bg-base-200 pt-28 pb-12 px-4 sm:px-6 flex justify-center transition-colors duration-300">
      {/* 🎯 min-w-0 নিশ্চিত করে যে ভেতরের ফ্লেক্স/গ্রিড চার্টকে পুশ করে স্ক্রিনের বাইরে পাঠাবে না */}
      <div className="w-full max-w-3xl space-y-6 min-w-0">
        {/* ১. প্রোফাইল কার্ড */}
        <div className="bg-base-100/70 backdrop-blur-md border border-base-content/5 shadow-sm rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-start">
          <div className="relative w-24 h-24 sm:w-20 sm:h-20 rounded-full ring-4 ring-blue-500/20 ring-offset-4 ring-offset-base-100 overflow-hidden bg-base-content/5 shadow-inner">
            <Image
              src={
                user?.image ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
              }
              alt={user?.name || "User profile"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="space-y-1.5 flex-1">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content">
              {user?.name || "Anonymous User"}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold text-base-content/60">
              <Mail size={14} className="text-blue-500" />
              <span>{user?.email || "No email linked"}</span>
            </div>
          </div>
        </div>

        {/* ২. একটিভিটি চার্ট কার্ড (১০০% রেসপন্সিভ ফিক্সড) */}
        <div className="bg-base-100/70 backdrop-blur-md border border-base-content/5 shadow-sm rounded-2xl p-4 sm:p-8 w-full min-w-0">
          <div className="flex items-center gap-2 mb-6 justify-center sm:justify-start">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Activity size={18} />
            </div>
            <h2 className="text-lg font-black tracking-tight text-base-content">
              Weekly Activity
            </h2>
          </div>

          {/* 🎯 রেসপন্সিভ র‍্যাপার কন্টেইনার */}
          <div className="w-full min-w-0">
            {/* aspect={2} দেওয়ার কারণে চার্টটি মোবাইল ও ডেক্সটপ দুই স্ক্রিনেই নিজের হাইট-উইডথ রেশিও ঠিক রাখবে */}
            <ResponsiveContainer width="100%" aspect={2}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  opacity={0.1}
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  tick={{ fontSize: 11 }}
                  className="font-bold opacity-60 fill-current"
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  dx={-5}
                  tick={{ fontSize: 11 }}
                  className="font-bold opacity-60 fill-current"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(0, 0, 0, 0.05)",
                  }}
                  itemStyle={{ fontWeight: "bold", color: "#3b82f6" }}
                  labelStyle={{
                    fontWeight: "bold",
                    opacity: 0.7,
                    color: "#000",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 3, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}