export interface Todo {
  id: number;
  title: string;
  description: string;
  author: string;
  status: boolean;
}

export interface RequestPostTodo {
  title: string;
  description: string;
  author: string;
  status: boolean;
}

export interface ResponseTodo<T> {
  status: number;
  data: T | null;
}

export interface ResponseGetTodos extends ResponseTodo<Todo[]> {}

export interface ResponseGetTodo extends ResponseTodo<Todo> {}

export interface ResponsePostTodo extends ResponseTodo<boolean> {}

export interface ResponsePatchTodo extends ResponseTodo<boolean> {}

export interface ResponseDeleteTodo extends ResponseTodo<boolean> {}

interface Responses {
  error: boolean;
  message: string;
}

export interface ResponseService extends Responses {
  data?: any;
}

export interface ResponseSuccess extends Responses {
  code: number;
  data?: any;
}

export interface ResponseError extends Responses {
  code: number;
  errors?: any;
}
