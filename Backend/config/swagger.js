import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to routes folder
const routesPath = path.join(__dirname, "../routes/*.js");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "College Bus Tracking API",
      version: "1.0.0",
      description: "API documentation for College Bus Location System",
    },
    servers: [
      { url: "http://localhost:5000" }
    ],
  },

  // 🔥 MUST be an absolute path — now fixed
  apis: [routesPath],
};

export const swaggerSpec = swaggerJsDoc(options);
export const swaggerUiMiddleware = swaggerUi;
