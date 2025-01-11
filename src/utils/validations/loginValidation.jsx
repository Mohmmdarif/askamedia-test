import staticCredential from "../../mocks/credentials.json";

export const validateCredential = (email, password) => {
  if (
    email === staticCredential.email &&
    password === staticCredential.password
  ) {
    return { isValid: true, error: "" };
  }

  if (email !== staticCredential.email) {
    return { isValid: false, error: "Invalid email! Please try again." };
  }

  if (password !== staticCredential.password) {
    return { isValid: false, error: "Invalid password! Please try again." };
  }

  return {
    isValid: false,
    error: "Invalid email or password! Please try again.",
  };
};
