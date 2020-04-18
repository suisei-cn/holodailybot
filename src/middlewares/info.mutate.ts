import { MutationMiddleware, Selections } from "../types";

const me: MutationMiddleware = {
  type: "mutate",
  payload(_, data) {
    return {
      username: data.message.from.first_name + (data.message.from.last_name ? " " + data.message.from.last_name : ""),
      userid: data.message.from.id,
      chatid: data.message.chat_id
    };
  },
};

export default me;
