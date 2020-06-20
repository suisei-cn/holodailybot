import express from "express";
import { Pipeline } from "./main";
import DiceList from "./listDefinitions";
import { SelectionResult } from "./types";

const app = express();
app.use(express.json());
// @ts-ignore
app.post("/botd027b3d59c15", (req: Request, res: Response) => {
  let result: SelectionResult[] = [];
  for (const i of DiceList) {
    const ret = i.procedures.act(req);
    if (typeof ret !== "number") {
      result.push(ret);
    }
  }
  if (result.length !== 0) {
    // TODO: integrate them to a tg message
  }
  // @ts-ignore
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
