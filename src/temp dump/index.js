"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleapis_1 = require("googleapis");
const firebase_functions_1 = require("firebase-functions");
admin.initializeApp();
const oAuth2Client = new googleapis_1.google.auth.OAuth2(functions.config().google.client_id, functions.config().google.client_secret, "urn:ietf:wg:oauth:2.0:oob");
oAuth2Client.setCredentials({
    refresh_token: functions.config().google.refresh_token,
});
const calendar = googleapis_1.google.calendar({ version: "v3", auth: oAuth2Client });
exports.createCalendarEvent = functions.https.onRequest(async (req, res) => {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Allowed");
        return;
    }
    const { summary, description, startDateTime, endDateTime } = req.body;
    const event = {
        summary,
        description,
        start: {
            dateTime: startDateTime,
            timeZone: "America/Los_Angeles",
        },
        end: {
            dateTime: endDateTime,
            timeZone: "America/Los_Angeles",
        },
    };
    try {
        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
        });
        res.status(200).send(response.data);
    }
    catch (error) {
        console.error("Error creating calendar event:", error);
        res.status(500).send("Failed to create calendar event");
    }
});
exports.testfuncfirestore = functions.firestore
    .document("/Appointments/{sku}")
    .onUpdate(async (change) => {
    const dataBefore = change.before.data();
    const dataAfter = change.after.data();
    if (!dataBefore || !dataAfter) {
        return;
    }
    // Check if the specific value has changed to true
    if (dataBefore.someField !== true && dataAfter.someField === true) {
        const summary = dataAfter.summary || "Default Summary";
        const description = dataAfter.description || "Default Description";
        const startDateTime = dataAfter.startDateTime || new Date().toISOString();
        const endDateTime = dataAfter.endDateTime ||
            new Date(Date.now() + 3600 * 1000).toISOString(); // 1 hour later
        const event = {
            summary,
            description,
            start: {
                dateTime: startDateTime,
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: endDateTime,
                timeZone: "America/Los_Angeles",
            },
        };
        try {
            const response = await calendar.events.insert({
                calendarId: "primary",
                requestBody: event,
            });
            firebase_functions_1.logger.log("Calendar event created successfully:", response.data);
        }
        catch (error) {
            console.error("Error creating calendar event:", error);
        }
    }
});
//# sourceMappingURL=index.js.map