import { describe, it } from "mocha";
import { assert } from "chai";
import { Pipeline } from "./main";

import VTuberInput from "./middlewares/vtuber.input"
import ValidityMutation from "./middlewares/validity.mutate"
import InfoMutation from "./middlewares/info.mutate"
import ExtMutation from "./middlewares/vtuberExt.mutate"
import BirthdayChange from "./middlewares/birthday.change"
import DebugChange from "./middlewares/debug.change"
import RandomSelection from "./middlewares/random.select"
import DebugFinal from "./middlewares/debug.final"

let written: any = {};

const pipeline = new Pipeline([
    VTuberInput,
    ValidityMutation,
    InfoMutation,
    ExtMutation,
    BirthdayChange,
    DebugChange,
    RandomSelection,
    DebugFinal((k: any) => {
        written = k;
    })
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
        assert.typeOf(written.result[0], "String", "Should return a name");
        done();
    });

    it("should give inline query results", function (done) {
        let result = pipeline.act(
            {
                body: {
                    // @ts-ignore
                    update_id: 445,
                    inline_query: {
                        id: 42,
                        from: {
                            id: 444,
                            first_name: "Test",
                            last_name: "One"
                        },
                        query: ""

                    }
                }
            }
        );
        assert.equal(result, 200, "Result should return 200");
        assert.typeOf(written.result[0], "String", "Should return a name");
        done();
    });

    it("should responds to debugging", function (done) {
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
                        text: "/my !debug 星街彗星 0"
                    }
                }
            }
        );
        assert.equal(result, 200, "Result should return 200");
        assert.equal(written.result[0], "星街彗星", "Should return Suisei");
        assert.isNotEmpty(written.result[2].prefix, "Should have debugging prefix");
        done();
    });

    it("should responds to regional-specified debugging", function (done) {
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
                        text: "/my !debug 鹤伞Ria 0 +cn"
                    }
                }
            }
        );
        assert.equal(result, 200, "Result should return 200");
        assert.equal(written.result[0], "鹤伞Ria", "Should return Ria");
        assert.isNotEmpty(written.result[2].prefix, "Should have debugging prefix");
        done();
    });
});