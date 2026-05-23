import Image from "next/image";
import Link from "next/link";
import React from "react";
import EditIdeaModal from "./EditIdea";
import DeleteIdeaModal from "./DeleteIdea";

const MyIdeaCard = ({ idea }) => {
  return (
    <div>
      <div className="rounded space-y-5 shadow hover:-translate-y-2 duration-700">
        <Image
          src={idea.image}
          alt={idea.name}
          width={200}
          height={200}
          className="w-full h-100"
        ></Image>

        <div className="card-body">
          <div>
            <span className="py-1 px-4 text-white font-semibold rounded-[2000px] bg-blue-600">
              {idea.category}
            </span>
          </div>
          <h2 className="text-2xl font-bold">{idea.name}</h2>
          <p>{idea.shortDescription}</p>

          <p>{idea.estimatedBudget}</p>
          <div className="flex items-center gap-5 flex-wrap">
            <EditIdeaModal idea={idea}></EditIdeaModal>
            <DeleteIdeaModal idea={idea}></DeleteIdeaModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIdeaCard;
