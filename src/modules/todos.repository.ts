import { Database } from "bun:sqlite";
import { Todo, RequestPostTodo } from "./todos.interface";

export default class TodosRepository {
  private db: Database;

  constructor() {
    this.db = new Database("todo.db");
    this.init()
      .then(() => console.log("Database initialized"))
      .catch(console.error);
  }

  async init() {
    return this.db.run(
      "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, author TEXT, status BOOLEAN)"
    );
  }

  async getTodos() {
    return this.db.query("SELECT * FROM todo").all();
  }

  async getTodo(id: number) {
    return this.db.query(`SELECT * FROM todo WHERE id = ${id}`).get();
  }

  async addTodo(todo: RequestPostTodo) {
    return this.db
      .query(
        "INSERT INTO todo (title, description, author, status) VALUES (?, ?, ?, ?) RETURNING id"
      )
      .get(todo.title, todo.description, todo.author, todo.status) as Todo;
  }

  async updateTodo(id: number, status: boolean) {
    return this.db
      .query(
        `UPDATE todo SET status = ${
          status ? 1 : 0
        } WHERE id = ${id} RETURNING id`
      )
      .get(status) as boolean;
  }

  async deleteTodo(id: number) {
    return this.db.run(`DELETE FROM todo WHERE id = ${id}`);
  }

  async deleteTodos() {
    return this.db.run(`DELETE FROM todo`);
  }
}
