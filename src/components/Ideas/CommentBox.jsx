"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import EditCommentModal from "./EditCommentModal";
import DeleteCommentModal from "./DeleteCommentModal";

const CommentBox = ({ comment }) => {
  const { data } = useSession();
  const user = data?.user;
  console.log(user);
  console.log(comment);
  return (
    <div className="relative  rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-6 shadow-lg">
      {/* top gradient blur */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />

      {/* dropdown */}
      {comment?.userId === user?.id && (
        <div className="dropdown dropdown-end absolute right-4 top-4 z-20">
          <label tabIndex={0} className="btn btn-sm btn-circle btn-ghost">
            <BsThreeDots size={18} />
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu w-56 rounded-xl bg-base-100 p-2 shadow-lg border border-base-200"
          >
            <li>
              <EditCommentModal comment={comment} />
            </li>

            <li>
              <DeleteCommentModal comment={comment} />
            </li>
          </ul>
        </div>
      )}

      {/* content */}
      <div className="relative flex gap-4">
        {/* image */}
        <div className="avatar self-start">
          <div className="w-14 rounded-full ring ring-primary/20 ring-offset-2 ring-offset-base-100">
            <Image
              src={comment?.image}
              alt={comment?.name}
              width={56}
              height={56}
              className="object-cover"
            />
          </div>
        </div>

        {/* text area */}
        <div className="flex-1 min-w-0">
          {/* name + date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <h2 className="text-base sm:text-lg font-bold text-base-content">
              {comment?.name}
            </h2>

            <p className="text-xs sm:text-sm text-base-content/60">
              {new Date(comment?.createdAt).toLocaleString("en-BD", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>

          {/* comment */}
          <div className="mt-3 rounded-2xl bg-base-200/70 px-4 py-3">
            <p className="text-sm leading-7 text-base-content/80 break-words">
              {comment?.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
