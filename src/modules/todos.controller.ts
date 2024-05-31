import { Todo, ResponseSuccess, ResponseError } from "./todos.interface";
import TodosRepository from "./todos.repository";

export default class TodosController {
  private todosRepository: TodosRepository;

  constructor() {
    this.todosRepository = new TodosRepository();
  }

  public getTodos = async ({
    query,
  }): Promise<ResponseSuccess | ResponseError> => {
    try {
      const todos: Todo[] = (await this.todosRepository.getTodos()) as Todo[];
      todos.map((todo: Todo) => {
        todo.status = Boolean(todo.status);
        return todo;
      });
      const { author, status, title } = query;
      const filteredTodos = todos.filter((todo) => {
        const {
          author: todoAuthor,
          status: todoStatus,
          title: todoTitle,
        } = todo;
        if (author && todoAuthor !== author) {
          return false;
        }
        if (status && todoStatus !== Boolean(status)) {
          return false;
        }
        if (title && !todoTitle.startsWith(title)) {
          return false;
        }
        return true;
      });
      if (filteredTodos.length === 0) {
        return {
          error: false,
          code: 404,
          message: "Get todos successfully, but no data found",
          data: null,
        };
      }
      return {
        error: false,
        code: 200,
        message: "Get todos successfully",
        data: {
          length: filteredTodos.length,
          todos: filteredTodos,
        },
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };

  public getTodo = async ({
    params,
  }): Promise<ResponseSuccess | ResponseError> => {
    try {
      const todo: Todo = (await this.todosRepository.getTodo(
        params.id as number
      )) as Todo;
      if (!todo)
        return {
          error: true,
          code: 400,
          message: "Get todo failed",
          data: null,
        };
      return {
        error: false,
        code: 200,
        message: `Get todo with id ${params.id} successfully`,
        data: todo,
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };

  public addTodo = async ({
    body,
  }): Promise<ResponseSuccess | ResponseError> => {
    try {
      const todos: Todo[] = (await this.todosRepository.getTodos()) as Todo[];
      console.log({ todos });
      const todoUser: Todo[] = todos.filter(
        (todo: Todo) =>
          todo.author === body.author && Boolean(todo.status) === false
      );
      if (todoUser.length > 10)
        return {
          error: true,
          code: 400,
          message: "Cannot add todo, your todo is more than 10",
          data: null,
        };
      const createdTodo: Todo = (await this.todosRepository.addTodo(
        body
      )) as Todo;
      if (!createdTodo)
        return {
          error: true,
          code: 400,
          message: "Add todo failed",
          data: null,
        };
      return {
        error: false,
        code: 200,
        message: "Add todo successfully",
        data: createdTodo,
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };

  public updateTodo = async ({
    params,
    body,
  }): Promise<ResponseSuccess | ResponseError> => {
    try {
      const todo: Todo = (await this.todosRepository.getTodo(
        params.id as number
      )) as Todo;
      if (!todo)
        return {
          error: true,
          code: 400,
          message: "Get todo failed",
          data: null,
        };
      const updatedStatusTodo: boolean = await this.todosRepository.updateTodo(
        params.id as number,
        body.status as boolean
      );
      return {
        error: false,
        code: 200,
        message: `Update todo with id ${params.id} successfully`,
        data: updatedStatusTodo,
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };

  public deleteTodos = async (): Promise<ResponseSuccess | ResponseError> => {
    try {
      await this.todosRepository.deleteTodos();
      return {
        error: false,
        code: 200,
        message: "Delete todos successfully",
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };

  public deleteTodo = async ({
    params,
  }): Promise<ResponseSuccess | ResponseError> => {
    try {
      await this.todosRepository.deleteTodo(params.id as number);
      return {
        error: false,
        code: 200,
        message: `Delete todo with id ${params.id} successfully`,
      };
    } catch (error: any) {
      return {
        error: true,
        code: 500,
        message: "Internal server error",
        errors: error.message,
      };
    }
  };
}
