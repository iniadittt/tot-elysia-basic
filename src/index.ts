import { Elysia } from "elysia";
import TodosRoutes from "./modules/todos.routes";

const app = new Elysia()
  .get("/", () => {
    return { message: "HELLO ELYSIA" };
  })
  .group("/todos", (app) => TodosRoutes(app))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);