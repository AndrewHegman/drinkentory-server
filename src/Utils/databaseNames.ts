require("dotenv");

export const getDatabaseName = () => {
  switch (process.env.MODE) {
    case "production":
      return "Beer";
    case "development":
      return "Beer-Development";
    case "staging":
      return "BeerStaging";
    default:
      return "Beer-Development";
  }
};
