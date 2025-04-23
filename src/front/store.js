export const initialStore = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const user_email = localStorage.getItem("user_email");
  const user_name = localStorage.getItem("user_name");
  const user_avatar = localStorage.getItem("user_avatar");

  return {
    user:
      token && user_id
        ? {
            id: user_id,
            email: user_email,
            name: user_name,
            avatar: user_avatar,
          }
        : null,
    token: token || null,
    message: null,
    todos: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "set_user":
      localStorage.setItem("user_id", action.payload.id);
      localStorage.setItem("user_email", action.payload.email);
      return {
        ...store,
        user: action.payload,
      };
    case "logout":
      return {
        ...store,
        user: null,
      };

    default:
      throw Error("Unknown action.");
  }
}
