// import * as functions2 from "firebase-functions/v2";
import * as functions1 from "firebase-functions/v1";
import {logger} from "firebase-functions/v2";


// temp disabled
// export const testfuncresSend = functions2.https.onRequest(
//   (request, response) => {


//   }
// );

export const testfuncfirestore = functions1
  .firestore
  .document("/Appointments/{sku}")
  .onUpdate((snapshot) => {
    const data = snapshot.after.data();
    logger.log(data);
  });

// const ConfirmedAppointmentCalandarUpdate = functions2.https.onRequest(
//     (request, response) => {
//       const name = request.params[0].replace("/", "");
//       const items: Indexable = {};
//       const message = items[name];
//       response.send(`<h1>${message}</h1>`)

//     }
//   );
// exports.OnAppointmentCancelCalandarUpdate = onRequest(
//   (request, response) => {}
// );
