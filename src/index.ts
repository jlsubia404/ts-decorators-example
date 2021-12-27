import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["asdf"] }));
app.use(AppRouter.getInstance());

app.listen(3090, () => {
  console.log("Server started on port 3090");
});
