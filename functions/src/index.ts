import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { google } from 'googleapis';
import { logger } from 'firebase-functions';
import { Request, Response } from 'express';

admin.initializeApp();

const oAuth2Client = new google.auth.OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  "urn:ietf:wg:oauth:2.0:oob"
);

oAuth2Client.setCredentials({
  refresh_token: functions.config().google.refresh_token,
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

interface CalendarEventRequest extends Request {
  body: {
    summary: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
  };
}

exports.createCalendarEvent = functions.https.onRequest(async (req: CalendarEventRequest, res: Response): Promise<void> => {
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
  } catch (error) {
    console.error("Error creating calendar event:", error);
    res.status(500).send("Failed to create calendar event");
  }
});

exports.testfuncfirestore = functions.firestore
  .document("/Appointments/{sku}")
  .onUpdate((change: functions.Change<admin.firestore.DocumentSnapshot>, context: functions.EventContext) => {
    const data = change.after.data();
    logger.log(data);
  });
