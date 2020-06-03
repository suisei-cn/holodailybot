import express from "express";
import { Pipeline } from "./main";

import VTuberInput from "./middlewares/vtuber.input"
import InfoMutation from "./middlewares/info.mutate"
import ExtMutation from "./middlewares/vtuberExt.mutate";
// import GoldenFinger from "./middlewares/goldenfinger/gf.change"
import BirthdayChange from "./middlewares/birthday.change"
import DebugChange from "./middlewares/debug.change"
import RandomSelection from "./middlewares/random.select"
import ConsoleFinal from "./middlewares/console.final"
import SendTGFinal from "./middlewares/sendtg.final"
import AnalyticsFinal from "./middlewares/analytics.final"

const app = express();
const pipeline = new Pipeline([
  VTuberInput,
  InfoMutation,
  ExtMutation,
  BirthdayChange,
  // GoldenFinger,
  DebugChange,
  RandomSelection,
  ConsoleFinal,
  SendTGFinal,
  AnalyticsFinal
]);

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
