import { describe, it } from "mocha";
import { assert } from "chai";
import { Pipeline } from "./main";
import vHolo from "./lists/vtuberInfo.hololive";

import VTuberInsert from "./middlewares/vtuberinsert.input.arg"
import DebugChange from "./middlewares/debug.change"
import RandomSelection from "./middlewares/random.select"
import { SelectionResult } from "./types";

const pipeline = new Pipeline([
    VTuberInsert(vHolo),
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
        assert.typeOf((result as SelectionResult).name, "string", "Should not spawn errors");
        done();
    });

    it("should give inline query results", function (done) {
        let result = pipeline.act(
            {
                body: {
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
        assert.typeOf((result as SelectionResult).name, "String", "Should return a name");
        done();
    });

    it("should respond to command debugging", function (done) {
        let result = pipeline.act(
            {
                body: {
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
        ) as SelectionResult;
        assert.equal(result.name, "星街彗星", "Should return Suisei");
        assert.isNotEmpty(result.options.prefix, "Should have debugging prefix");
        done();
    });

    it("should respond to inline debugging", function (done) {
        let result = pipeline.act(
            {
                body: {
                    update_id: 445,
                    inline_query: {
                        id: 42,
                        from: {
                            id: 444,
                            first_name: "Test",
                            last_name: "One"
                        },
                        query: "!debug 星街彗星 0"

                    }
                }
            }
        ) as SelectionResult;
        assert.equal(result.name, "星街彗星", "Should return Suisei");
        assert.isNotEmpty(result.options.prefix, "Should have debugging prefix");
        done();
    });
});
