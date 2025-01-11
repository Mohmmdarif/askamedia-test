import React from "react";
import TitleHeader from "./TitleHeader";
import InformationList from "./InformationList";

export default function CardRecipe({ data }) {
  const { calories, carbohydrates, fat, protein } =
    data.nutrition_facts_per_serving;

  const nutritionFacts = [
    { label: "Calories", value: `${calories} kcal` },
    { label: "Protein", value: `${protein}g` },
    { label: "Fat", value: `${fat}g` },
    { label: "Carbohydrates", value: `${carbohydrates}g` },
  ];

  const details = [
    { label: "Preparation Time", value: `${data.prep_time_minutes} minutes` },
    { label: "Cooking Time", value: `${data.cook_time_minutes} minutes` },
    { label: "Total Time", value: `${data.total_time_minutes} minutes` },
    { label: "Servings", value: `${data.servings} people` },
  ];

  return (
    <div className="container mx-auto px-4 md:p-4 w-full md:w-2/3">
      <div>
        <div className="py-4">
          <h2 className="font-bold text-xl md:text-4xl mb-2">{data.name}</h2>
          <p className="text-gray-700 text-sm md:text-base dark:text-white">
            {data.description}
          </p>
        </div>
        <img
          className="w-3/4 md:w-2/3 lg:w-2/5 object-cover h-2/5 mx-auto rounded-lg cursor-pointer shadow-lg hover:scale-[101%] transition-transform duration-300 ease-in-out"
          src={data.image}
          alt="food image"
        />
        <div className="py-4">
          <TitleHeader title="Details" />
          <InformationList data={details} />
        </div>
        <div className="py-2">
          <TitleHeader title="Ingredients" />
          <ul className="list-disc px-6 py-4 marker:text-orange-600">
            {data?.ingredients?.map((ingredient, index) => (
              <li
                key={index}
                className="text-gray-700 text-sm md:text-base dark:text-white"
              >
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="py-4">
          <TitleHeader title="Instructions" />
          {data?.steps?.map((item, index) => (
            <p
              key={index}
              className="text-gray-700 text-sm md:text-base font-bold space-y-2 dark:text-white"
            >
              Step {item.step_number} :{" "}
              <span className="font-normal">{item.instruction}</span>
            </p>
          ))}
        </div>
        <div className="py-4">
          <TitleHeader title="Nutrition Facts">
            <span className="ml-2 text-sm md:text-lg">(Per Serving)</span>
          </TitleHeader>
          <InformationList data={nutritionFacts} />
        </div>
      </div>
    </div>
  );
}
