import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET'
);

// Assuming you have a method to obtain these tokens
oAuth2Client.setCredentials({
  refresh_token: 'YOUR_REFRESH_TOKEN',
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

export const createEvent = async (event) => {
  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
  return response.data;
};

export const deleteEvent = async (eventId) => {
  await calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  });
};

export const updateEvent = async (eventId, event) => {
  const response = await calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: event,
  });
  return response.data;
};

