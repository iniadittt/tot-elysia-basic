import TodosController from "./todos.controller";
import TodosSchema from "./todos.schema";

const todosController: TodosController = new TodosController();
const todosSchema: TodosSchema = new TodosSchema();

const TodosRoutes = (app) =>
  app
    .get("/", todosController.getTodos)
    .get("/:id", todosController.getTodo, todosSchema.getTodo)
    .post("/", todosController.addTodo, todosSchema.addTodo)
    .patch("/:id", todosController.updateTodo, todosSchema.updateTodo)
    .delete("/", todosController.deleteTodos)
    .delete("/:id", todosController.deleteTodo, todosSchema.deleteTodo);

export default TodosRoutes;
