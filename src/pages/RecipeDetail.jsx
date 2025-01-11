import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import CardRecipe from "../components/CardRecipe";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const response = localStorage.getItem("recipeData");

    if (response) {
      const data = JSON.parse(response);
      const selectedRecipe = data.recipes.find(
        (recipe) => recipe.id === parseInt(id)
      );
      setRecipe(selectedRecipe);
    }
  }, [id]);

  if (!recipe) {
    return <Spinner style="border-orange-600" />;
  }

  return (
    <>
      <CardRecipe data={recipe} />
    </>
  );
}
