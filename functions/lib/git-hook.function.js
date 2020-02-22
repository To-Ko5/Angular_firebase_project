"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.gitHook = functions.https.onRequest(async (request, response) => {
    const pets = await db.collection('pets')
        .where('ownerGitHubId', '==', request.body.sender.id)
        .get();
    const increment = admin.firestore.FieldValue.increment(10);
    pets.docs.forEach(doc => doc.ref.update({
        exp: increment
    }));
    response.send("succes");
});
//# sourceMappingURL=git-hook.function.js.map