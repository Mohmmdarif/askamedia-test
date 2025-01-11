import React, { useEffect, useState } from "react";
import CardList from "./CardList";

export default function CardContainer({ recipes, onClick, onClickDelete }) {
  const setToLocalStorage = (data) => {
    localStorage.setItem("initialData", JSON.stringify(data));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {recipes?.map((recipe, index) => {
        return (
          <CardList
            key={index}
            data={recipe}
            onClick={(e) => {
              onClick(e, recipe.id, setToLocalStorage({ ...recipe }));
            }}
            onClickDelete={(e) => {
              onClickDelete(e, recipe.id, setToLocalStorage({ ...recipe }));
            }}
          />
        );
      })}
    </div>
  );
}
