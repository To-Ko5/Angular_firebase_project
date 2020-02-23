"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const expTable = [
    20,
    40,
    100,
    150,
    250,
    500,
    1000,
    1500,
    2500,
    5000
];
const ExperiencePoint = 10;
exports.gitHook = functions.https.onRequest(async (request, response) => {
    console.log(request.body.sender.id);
    const pets = await db.collection('pets')
        .where('ownerGitHubId', '==', request.body.sender.id)
        .get();
    const pet = pets.docs[0].data();
    let level = 1;
    expTable.some(nextExp => {
        if (pet.exp + ExperiencePoint >= nextExp) {
            level++;
            return false;
        }
        else {
            return true;
        }
    });
    const increment = admin.firestore.FieldValue.increment(ExperiencePoint);
    pets.docs.forEach(doc => doc.ref.update({
        exp: increment,
        level: level
    }));
    response.send("succes");
});
//# sourceMappingURL=git-hook.function.js.map