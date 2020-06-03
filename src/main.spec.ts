import { describe, it } from "mocha";
import { assert } from "chai";
import { Pipeline } from "./main";

import VTuberInput from "./middlewares/vtuber.input"
import InfoMutation from "./middlewares/info.mutate"
import ExtMutation from "./middlewares/vtuberExt.mutate";
import BirthdayChange from "./middlewares/birthday.change"
import DebugChange from "./middlewares/debug.change"
import RandomSelection from "./middlewares/random.select"

const pipeline = new Pipeline([
    VTuberInput,
    InfoMutation,
    ExtMutation,
    BirthdayChange,
    DebugChange,
    RandomSelection
]);

describe("Pipeline", function () {
    it("should give results", function (done) {
        let result = pipeline.act(
            {
                body: {
                    // @ts-ignore
                    message: {
                        message_id: 440,
                        from: {
                            id: 443,
                            first_name: "Test"
                        },
                        chat: {
                            id: 444
                        },
                        text: "/my"
                    }
                }
            }
        );
        assert.equal(result, 200, "Result should return 200");
        done();
    })
})