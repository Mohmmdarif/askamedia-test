import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import InputForm from "./InputForm";
import {
  validateForm,
  resetFormInputs,
} from "../utils/validations/formValidation";
import Notification from "./Notification";

export default function Modal({ onClose, id }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    prep_time_minutes: "",
    cook_time_minutes: "",
    total_time_minutes: "",
    servings: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    steps: [{ step_number: 1, instruction: "" }],
    nutrition_facts_per_serving: {
      calories: "",
      protein: "",
      carbohydrates: "",
      fat: "",
    },
  });

  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem("initialData") || {});

    if (id && initialData) {
      setFormData(initialData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleStepChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSteps = [...formData.steps];
    updatedSteps[index][name] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", unit: "" },
      ],
    });
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        { step_number: formData.steps.length + 1, instruction: "" },
      ],
    });
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      nutrition_facts_per_serving: {
        ...formData.nutrition_facts_per_serving,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const form = validateForm(formData);
      const existingData = JSON.parse(localStorage.getItem("recipeData")) || {
        recipes: [],
      };

      if (form.isValid) {
        setSuccess(form);

        if (id) {
          // Update mode
          const updatedRecipes = existingData.recipes.map((recipe) =>
            recipe.id === id ? { ...recipe, ...formData } : recipe
          );
          localStorage.setItem(
            "recipeData",
            JSON.stringify({ recipes: updatedRecipes })
          );
        } else {
          const newRecipe = {
            id: existingData.recipes.length + 1,
            ...formData,
          };
          existingData.recipes.push(newRecipe);
          localStorage.setItem("recipeData", JSON.stringify(existingData));
        }
        resetFormInputs(setFormData);
        window.location.reload();
        setTimeout(() => setIsModalOpen(!isModalOpen), 0);
      } else {
        setError(form);
      }
    } catch (error) {
      console.error("Error while submitting form: ", error);
    }
  };

  if (error) {
    setTimeout(() => setError(null), 3000);
  }

  if (success) {
    setTimeout(() => setSuccess(null), 3000);
  }

  return isModalOpen ? (
    <div className="fixed inset-0 py-3 bg-gray-900 bg-opacity-50 flex items-center justify-center overflow-hidden z-10">
      {success && (
        <Notification status={success.status} message={success.message} />
      )}
      {error && <Notification status={error.status} message={error.message} />}
      <div className="bg-white p-8 mx-4 md:mx-0 w-full md:w-4/5 lg:w-1/2 max-h-full md:h-full rounded-lg overflow-hidden">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-black">
            {id ? "Edit Recipe" : "Add Recipe"}
          </h2>
          <button
            className="mb-4 hover:bg-gray-100 hover:rounded-full p-2"
            onClick={onClose}
          >
            <AiOutlineClose size={20} className="dark:text-black" />
          </button>
        </div>
        <div className="overflow-auto max-h-[80vh]">
          <form onSubmit={handleSubmit} className="mx-auto rounded-lg px-1">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base dark:text-black">
              <InputForm
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <InputForm
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
              />
              <InputForm
                type="number"
                name="prep_time_minutes"
                placeholder="Preparation Time (minutes)"
                value={formData.prep_time_minutes}
                onChange={handleInputChange}
              />
              <InputForm
                type="number"
                name="cook_time_minutes"
                placeholder="Cooking Time (minutes)"
                value={formData.cook_time_minutes}
                onChange={handleInputChange}
              />
              <InputForm
                type="number"
                name="total_time_minutes"
                placeholder="Total Time (minutes)"
                value={formData.total_time_minutes}
                onChange={handleInputChange}
              />
              <InputForm
                type="number"
                name="servings"
                placeholder="Servings"
                value={formData.servings}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded"
              ></textarea>
            </div>

            {/* Ingredients */}
            <h3 className="text-sm md:text-base font-bold mt-6 dark:text-black">
              Ingredients
            </h3>
            {formData.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 my-2 text-sm md:text-base"
              >
                <InputForm
                  type="text"
                  name="name"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
                <InputForm
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
                <InputForm
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddIngredient}
              className="outline outline-1 outline-orange-600 text-orange-600 px-4 py-2 rounded mt-2 text-sm md:text-base"
            >
              Add Ingredient
            </button>

            {/* Steps */}
            <h3 className="text-sm md:text-base font-bold mt-6 dark:text-black">
              Steps
            </h3>
            {formData.steps.map((step, index) => (
              <div
                key={index}
                className="my-2 text-sm md:text-base dark:text-black"
              >
                <textarea
                  name="instruction"
                  placeholder={`Step ${index + 1}`}
                  value={step.instruction}
                  onChange={(e) => handleStepChange(index, e)}
                  className="p-2 border border-gray-300 rounded w-full"
                ></textarea>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="outline outline-1 outline-orange-600 text-orange-600 px-4 py-2 rounded mt-2 text-sm md:text-base"
            >
              Add Step
            </button>

            {/* Nutrition Facts */}
            <h3 className="text-sm md:text-base font-bold mt-6 mb-2 dark:text-black">
              Nutrition Facts Per Serving
            </h3>
            <div className="grid grid-cols-4 gap-4 text-sm md:text-base dark:text-black">
              <InputForm
                type="number"
                name="calories"
                placeholder="Calories"
                value={formData.nutrition_facts_per_serving.calories}
                onChange={handleNutritionChange}
              />
              <InputForm
                type="number"
                name="protein"
                placeholder="Protein"
                value={formData.nutrition_facts_per_serving.protein}
                onChange={handleNutritionChange}
              />
              <InputForm
                type="number"
                name="carbohydrates"
                placeholder="Carbohydrates"
                value={formData.nutrition_facts_per_serving.carbohydrates}
                onChange={handleNutritionChange}
              />
              <InputForm
                type="number"
                name="fat"
                placeholder="Fat"
                value={formData.nutrition_facts_per_serving.fat}
                onChange={handleNutritionChange}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 font-semibold text-white px-6 py-2 rounded mt-6 text-sm md:text-base mb-5 md:mb-0"
            >
              {id ? "Update" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
