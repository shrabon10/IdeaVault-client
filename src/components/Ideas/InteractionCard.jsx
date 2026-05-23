"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";

const InteractionCard = ({ comment }) => {
  const { data } = useSession();
  const user = data?.user;
  console.log(user);
  console.log(comment);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-sky-50 to-white p-5 sm:p-6 shadow-xl shadow-sky-300/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-sky-200/40 via-transparent to-violet-100/30" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
        <Image
          src={comment?.image}
          alt={comment?.name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full border-2 border-white bg-slate-100 object-cover shadow-sm shadow-slate-200/50"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 text-slate-900">
            <p className="text-lg font-semibold tracking-tight">
              {comment?.name}
            </p>
          </div>
          <div className="mt-4 rounded-3xl border border-slate-200 bg-white/90 p-4 text-sm leading-6 text-slate-700 shadow-sm shadow-slate-100">
            {comment?.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionCard;
