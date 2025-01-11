import React from "react";
import { useNavigate } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";

export default function CardList({ data, onClick, onClickDelete }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${data.id}`);
  };
  return (
    <>
      <div
        className="flex flex-wrap justify-center cursor-pointer relative"
        onClick={handleCardClick}
      >
        <div className="absolute top-0 right-0 bg-orange-500 text-white rounded-bl-lg rounded-tr-lg z-10">
          <button className="w-full h-full px-4 py-3" onClick={onClick}>
            <RiEdit2Fill size={20} />
          </button>
        </div>
        <div className="absolute top-0 left-0 bg-red-500 text-white rounded-br-lg rounded-tl-lg z-10">
          <button className="w-full h-full px-4 py-3" onClick={onClickDelete}>
            <MdDelete size={20} />
          </button>
        </div>
        <div className="w-full rounded-xl overflow-hidden shadow-lg hover:scale-[101%] transition-transform duration-300 ease-in-out dark:bg-white">
          <img
            className="w-full object-cover h-64 mx-auto"
            src={data.image}
            alt="food image"
          />
          <div className="px-6 py-4">
            <h2 className="font-bold text-lg md:text-xl mb-2 dark:text-black">
              {data.name}
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
