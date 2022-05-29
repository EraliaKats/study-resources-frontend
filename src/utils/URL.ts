export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://fone-study-resources.herokuapp.com"
    : "http://localhost:4000";

export const frontendURL =
  process.env.NODE_ENV === "production"
    ? "https://fone-study-resources.netlify.app"
    : "http://localhost:3000";
