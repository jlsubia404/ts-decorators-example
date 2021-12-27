import { NextFunction, Request, Response } from "express";
import { Controller, Get, use } from "./decorators";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not permitted");
}
@Controller("")
export class RootController {
  @Get("/")
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
          `);
    } else {
      res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
          `);
    }
  }

  @Get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send("Welcome to protected route, logged in user");
  }
}
