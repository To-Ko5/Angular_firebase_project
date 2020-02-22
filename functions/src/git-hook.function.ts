import * as functions from "firebase-functions";

export const gitHook = functions.https.onRequest((request, response) => {
  console.log(request.body); //demo pushed4
  response.send("succes");
});
