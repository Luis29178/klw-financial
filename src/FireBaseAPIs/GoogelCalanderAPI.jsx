const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

admin.initializeApp();

const oAuth2Client = new OAuth2(
  functions.config().google.client_id,
  functions.config().google.client_secret,
  'urn:ietf:wg:oauth:2.0:oob'
);

oAuth2Client.setCredentials({
  refresh_token: functions.config().google.refresh_token
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

exports.createCalendarEvent = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { summary, description, startDateTime, endDateTime } = req.body;

  const event = {
    summary,
    description,
    start: {
      dateTime: startDateTime,
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error creating calendar event:', error);
    res.status(500).send('Failed to create calendar event');
  }
});
