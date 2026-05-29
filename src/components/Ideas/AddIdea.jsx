"use client";

import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export const metadata = {
  title: "IdeaVault | Add Idea",
  description: "Add New Idea for share your modern Idea",
};

const AddIdea = () => {
  const { data } = useSession();
  const user = data?.user;
  const handleAddNow = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const info = Object.fromEntries(formData.entries());

    const ideaData = {
      name: info?.name,
      category: info?.category,
      shortDescription: info?.shortDescription,
      detailedDescription: info?.detailedDescription,
      tags: info?.tags.split(",").map((tag) => tag.trim()),
      image: info?.image,
      estimatedBudget: info?.estimatedBudget,
      targetAudience: info?.targetAudience,
      problemStatement: info?.problemStatement,
      proposedSolution: info?.proposedSolution,
      userImage: user.image,
      userName: user.name,
      userId: user?.id,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/idea`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ideaData),
    });
    const data = await res.json();

    if (data?.insertedId) {
      toast.success("Idea added successfully");
      redirect("/ideas");
    } else {
      toast.error("Failed to add idea");
    }
  };
  return (
    <div className="space-y-5 px-2">
      <div className="space-y-2">
        <h2 className="text-4xl font-bold">Add Your Idea</h2>
        <p className="text-gray-500">
          Share your startup concept with the world and get valuable feedback.
        </p>
      </div>
      <form
        onSubmit={handleAddNow}
        className="border border-gray-200 rounded py-8 px-5 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="py-5">
            <label>Idea Name</label>
            <input
              type="text"
              name="name"
              className="input w-full h-full mt-2"
              placeholder="Enter Idea Name"
              required
            />
          </div>
          <div className="py-5">
            <label>Category</label>
            <select
              defaultValue="Category"
              name="category"
              className="select w-full h-full mt-2"
              required
            >
              <option disabled={true}>Category</option>
              <option value="Startup">Startup</option>
              <option value="Productivity">Productivity</option>
              <option value="Education">Education</option>
              <option value="AI Tools">AI Tools</option>
              <option value="AI Education">AI Education</option>
              <option value="Marketplace">Marketplace</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>
        <div>
          <label>Idea Short Description</label>
          <input
            required
            type="text"
            name="shortDescription"
            className="input w-full mt-2 py-6 text-wrap"
            placeholder="Enter Idea Short Description"
          />
        </div>
        <div>
          <label>Idea Detailed Description</label>
          <textarea
            required
            type="text"
            name="detailedDescription"
            className="input w-full mt-2 h-40 pt-2 resize-none text-wrap"
            placeholder="Enter the Detailed Description"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="py-5">
            <label>Idea Tags</label>
            <input
              type="text"
              name="tags"
              className="input w-full h-full mt-2"
              placeholder="Enter Idea Tags (optional)"
            />
          </div>
          <div className="py-5">
            <label>Image URL</label>
            <input
              required
              type="text"
              name="image"
              className="input w-full h-full mt-2"
              placeholder="Enter Idea Image Url"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="py-5">
            <label>Estimated Budget</label>
            <input
              type="text"
              name="estimatedBudget"
              className="input w-full h-full mt-2"
              placeholder="Enter Idea Estimated Budget (optional)"
            />
          </div>
          <div className="py-5">
            <label>Target Audience</label>
            <input
              required
              type="text"
              name="targetAudience"
              className="input w-full h-full mt-2"
              placeholder="Enter Idea Target Audience"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 lg:gap-10">
          <div className="py-5">
            <label>ProblemStatement</label>
            <textarea
              required
              type="text"
              name="problemStatement"
              className="input w-full mt-2 h-40 pt-2 resize-none text-wrap"
              placeholder="Enter the ProblemStatement"
            />
          </div>
          <div className="py-5">
            <label>ProposedSolution</label>
            <textarea
              required
              type="text"
              name="proposedSolution"
              className="input w-full py-2 h-40 mt-2 resize-none text-wrap"
              placeholder="Enter Idea proposedSolution"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn w-full mt-5 text-white font-bold bg-blue-500"
        >
          Add Now
        </button>
      </form>
    </div>
  );
};

export default AddIdea;
