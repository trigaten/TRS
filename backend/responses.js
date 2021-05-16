class Response {
    constructor(result, msg) {
        this.message = msg;
        this.result = result;
    }
}

class SuccessResponse extends Response {
    constructor(msg) {
        super("success", msg)
        logAction(msg)
    }
}

class WarningResponse extends Response {
    constructor(msg) {
        super("warning", msg)
        logAction(msg)
    }
}

class FailureResponse extends Response {
    constructor(msg) {
        super("failure", msg)
        logAction(msg)
    }
}

class ContinueResponse extends Response {
    constructor(msg, index, result="continue") {
        super(result, msg)
        this.index = index;
    }
}

class NeutralResponse extends Response {
    constructor(msg) {
        super("neutral", msg)
        logAction(msg)
    }
}