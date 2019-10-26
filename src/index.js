import express from "express";
import bodyParser from "body-parser";
import People from "./routes/people.route";
import cors from "cors";

// Create global App project
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (request, response) => {
  return response.status(200).send({
    message: "Welcome to CashBox test by Damilola Adekoya"
  });
});

app.use("/people", People);

app.use((request, response, next) => {
  const error = new Error("You are trying to access a wrong Route");
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    status: error.status || 500,
    error: error.name,
    message: error.message
  });
});

const PORT = process.env.PORT || 7700;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(12, `Listening on port: ${PORT}`);
});

export default app;
