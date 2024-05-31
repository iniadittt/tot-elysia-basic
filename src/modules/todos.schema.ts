import { t } from "elysia";

export default class TodosSchema {
  constructor() {}

  getTodos = {
    query: t.Partial(
      t.Object({
        author: t.String({
          error() {
            return "Author harus string";
          },
        }),
        status: t.Boolean({
          error() {
            return "Status harus boolean";
          },
        }),
        title: t.String({
          error() {
            return "Title harus string";
          },
        }),
      })
    ),
  };

  getTodo = {
    params: t.Object({
      id: t.Numeric({
        error() {
          return "Todo id harus number";
        },
      }),
    }),
  };

  addTodo = {
    type: "json",
    body: t.Object({
      title: t.String({
        error() {
          return "Todo title harus string";
        },
      }),
      description: t.String({
        error() {
          return "Todo description harus string";
        },
      }),
      author: t.String({
        error() {
          return "Todo author harus string";
        },
      }),
      status: t.Boolean({
        error() {
          return "Todo status harus boolean";
        },
      }),
    }),
  };

  updateTodo = {
    type: "json",
    params: t.Object({
      id: t.Numeric({
        error() {
          return "Todo id harus number";
        },
      }),
    }),
    body: t.Object({
      status: t.Boolean({
        error() {
          return "Todo status harus boolean";
        },
      }),
    }),
  };

  deleteTodo = {
    type: "json",
    params: t.Object({
      id: t.Numeric({
        error() {
          return "Todo id harus number";
        },
      }),
    }),
  };
}
