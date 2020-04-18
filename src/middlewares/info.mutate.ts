import { MutationMiddleware, Selections } from "../types";

const me: MutationMiddleware = {
  type: "mutate",
  payload(_, data) {
    let ret = {
      username: data.message.from.first_name + (data.message.from.last_name ? " " + data.message.from.last_name : ""),
      userid: data.message.from.id,
      chatid: data.message.chat.id,
      msg: data.message.text
    };
    let message = ret.msg.toLowerCase();
    if (message.startsWith("/my ") || message.startsWith("/my@holodailybot") || message === "/my" || message === "/my@holodailybot") {
      ret = Object.assign(ret, {
        valid: true,
        query: ret.msg.replace(/^\/my(@holodailybot)? ?/i,"")
      })
    }
    return ret;
  },
};

export default me;
