import { MutationMiddleware, BreakException } from "../types";

const me: MutationMiddleware = {
  type: "mutate",
  payload(_, data) {
    if ((data?.message?.message?.text) || (data?.message?.inline_query))
    return {};
    throw BreakException;
  },
};

export default me;
