import AddIdea from "@/components/Ideas/AddIdea";
import React from "react";

export const metadata = {
  title: "IdeaVault | Add Idea",
  description: "Add New Idea for share your modern Idea",
};

const AddIdeaPage = () => {
  return (
    <div className="mt-10">
      <AddIdea></AddIdea>
    </div>
  );
};

export default AddIdeaPage;
