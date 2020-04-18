import express from "express";
import { Pipeline } from "./main";

import HololiveInput from "./middlewares/hololive.input"
import InfoMutation from "./middlewares/info.mutate"
import RandomSelection from "./middlewares/random.select"
import ConsoleFinal from "./middlewares/console.final"
import sendTGFinal from "./middlewares/sendtg.final"

const app = express();
const pipeline = new Pipeline([HololiveInput, InfoMutation, RandomSelection, ConsoleFinal, sendTGFinal]);

app.use(express.json());
// @ts-ignore
app.post("/botd027b3d59c15", (req: Request, res: Response) => {
  console.log(req.body);
  let result = pipeline.act(req);
  // @ts-ignore
  res.sendStatus(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
