import express from "express";
import { Pipeline } from "./main";

import HololiveInput from "./middlewares/hololive.input"
import InfoMutation from "./middlewares/info.mutate"
import NameBonusChange from "./middlewares/names.change"
import BirthdayChange from "./middlewares/birthday.change"
import RandomSelection from "./middlewares/random.select"
import ConsoleFinal from "./middlewares/console.final"
import SendTGFinal from "./middlewares/sendtg.final"

const app = express();
const pipeline = new Pipeline([HololiveInput, InfoMutation, BirthdayChange, NameBonusChange, RandomSelection, ConsoleFinal, SendTGFinal]);

app.use(express.json());
// @ts-ignore
app.post("/botd027b3d59c15", (req: Request, res: Response) => {
  let result = pipeline.act(req);
  // @ts-ignore
  res.sendStatus(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
