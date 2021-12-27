import { Router, Request, Response, NextFunction } from "express";
import { bodyValidator, Controller, Get, Post, use } from "./decorators";

@Controller("/auth")
export class LoginController {
  @Get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
          <form method="POST">
              <div>
                  <label>Email</label>
                  <input name="email" />
              </div>
              <div>
                  <label>Password</label>
                  <input name="password" type="password" />
              </div>
              <button>Submit</button>
          </form>`);
  }
  //router.post("/login",
  @Post("/login")
  @bodyValidator("email", "password")
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email === "hi@hi.com" && password === "password") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }
  @Get("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect("/");
  }
}
