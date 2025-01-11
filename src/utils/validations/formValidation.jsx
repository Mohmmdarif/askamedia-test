export const validateForm = (formData) => {
  const {
    name,
    image,
    description,
    prep_time_minutes,
    cook_time_minutes,
    total_time_minutes,
    servings,
    ingredients,
    steps,
    nutrition_facts_per_serving,
  } = formData;

  if (
    !name ||
    !image ||
    !description ||
    !prep_time_minutes ||
    !cook_time_minutes ||
    !total_time_minutes ||
    !servings ||
    ingredients.some(
      (ingredient) =>
        !ingredient.name || !ingredient.quantity || !ingredient.unit
    ) ||
    steps.some((step) => !step.instruction) ||
    !nutrition_facts_per_serving.calories ||
    !nutrition_facts_per_serving.protein ||
    !nutrition_facts_per_serving.carbohydrates ||
    !nutrition_facts_per_serving.fat
  ) {
    return {
      isValid: false,
      status: "Failed!",
      message: "Please fill out all fields",
    };
  }

  return {
    isValid: true,
    status: "Success!",
    message: "Your recipe has been created successfully.",
  };
};

export const resetFormInputs = (setFormData) => {
  setFormData({
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
};
