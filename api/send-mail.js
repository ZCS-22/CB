import nodemailer from "nodemailer";
import { google } from "googleapis";

const SHEETS_SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEETS_TAB_NAME = process.env.SHEETS_TAB_NAME || "Sheet1";

function createSheetsClient() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

async function appendContactRow({ firstName, lastName, email, contact, location, message }) {
  if (!SHEETS_SPREADSHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return;

  const sheets = createSheetsClient();
  const submittedAt = new Date().toISOString();
  const fullName = `${firstName} ${lastName || ""}`.trim();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEETS_SPREADSHEET_ID,
    range: `${SHEETS_TAB_NAME}!A:G`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[submittedAt, fullName, email, contact, location, message]],
    },
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed." });
  }

  const { firstName, lastName, email, contact, location, message } = req.body || {};

  if (!firstName || !email || !contact || !location || !message) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    return res.status(500).json({ success: false, message: "Email server configuration is missing." });
  }

  const fullName = `${firstName} ${lastName || ""}`.trim();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const adminMail = {
    from: process.env.GMAIL_USER,
    replyTo: email,
    to: process.env.GMAIL_USER,
    subject: `Get in Touch Form submission from ${fullName}`,
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Contact:</b> ${contact}</p>
      <p><b>Location:</b> ${location}</p>
      <p><b>Comment:</b> ${message}</p>
    `,
  };

  const ackMail = {
    from: process.env.GMAIL_USER,
    to: email,
    replyTo: process.env.GMAIL_USER,
    subject: "We received your message - Chennai Beats",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
        <h2>Hi ${fullName},</h2>
        <p>Thank you for contacting <b>Chennai Beats</b>.</p>
        <p>We have received your message and will get back to you soon.</p>
        <h3>Your submission details</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Contact:</b> ${contact}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Comment:</b> ${message}</p>
        <br />
        <p>Regards,</p>
        <p><b>Chennai Beats Team</b></p>
      </div>
    `,
  };

  try {
    await Promise.all([
      appendContactRow({ firstName, lastName, email, contact, location, message }),
      transporter.sendMail(adminMail),
      transporter.sendMail(ackMail),
    ]);

    return res.status(200).json({ success: true, message: "Email sent and spreadsheet updated successfully." });
  } catch (error) {
    console.error("Mail/Sheets error:", error);
    return res.status(500).json({ success: false, message: error?.message || "Failed to process contact form." });
  }
}
