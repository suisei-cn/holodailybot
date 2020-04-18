import { MutationMiddleware, BreakException } from "../types";

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
    if (!message) {
      throw BreakException;
    }

    let ret = {
      id: inline ? message.id : message.message_id,
      username: message.from.first_name + (message.from.last_name ? " " + message.from.last_name : ""),
      userid: message.from.id,
      chatid: inline ? -1 : message.chat.id,
      msg: message.text
    };

    if (!inline) {
      let lowerQuery = ret.msg.toLowerCase();
      if (lowerQuery.startsWith("/my ") || lowerQuery.startsWith("/my@holodailybot") || lowerQuery === "/my" || lowerQuery === "/my@holodailybot") {
        valid = true;
        query = ret.msg.replace(/^\/my(@holodailybot)? ?/i, "")
      }
    } else {
      query = message.query;
    }
    return Object.assign(ret, {
      valid, query, inline
    });
  },
};

export default me;
