"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
exports.gitHook = functions.https.onRequest((request, response) => {
    console.log(request.body);
    //demo pushed2
    response.send("succes");
});
//# sourceMappingURL=git-hook.function.js.map