import { MutationMiddleware, Selections } from "../types";

const me: MutationMiddleware = {
  type: "mutate",
  payload(_, data) {
    let message = data.message.message;
    let inline = false;
    let valid = false;
    let query;
    if (data.message.inline_query) {
      message = data.message.inline_query;
      inline = true;
      valid = true;
    }

    let ret = {
      id: inline ? message.id : message.message_id,
      username: message.from.first_name + (message.from.last_name ? " " + message.from.last_name : ""),
      userid: message.from.id,
      chatid: inline ? -1 : message.chat.id,
      msg: message.text
    };

    if (!inline) {
      let query = ret.msg.toLowerCase();
      if (query.startsWith("/my ") || query.startsWith("/my@holodailybot") || query === "/my" || query === "/my@holodailybot") {
        valid = true;
        query = ret.msg.replace(/^\/my(@holodailybot)? ?/i, "")
      }
    } else {
      query = "";
    }
    return Object.assign(ret, {
      valid, query, inline
    });
  },
};

export default me;
