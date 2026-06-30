import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const app = express();

const SERVER_PORT = Number(process.env.SERVER_PORT) || 5137;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const SHEETS_SPREADSHEET_ID = process.env.SHEETS_SPREADSHEET_ID;
const SHEETS_TAB_NAME = process.env.SHEETS_TAB_NAME || "Sheet1";
const GOOGLE_APPLICATION_CREDENTIALS =
  process.env.GOOGLE_APPLICATION_CREDENTIALS;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

function createSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({
    version: "v4",
    auth,
  });
}

async function appendContactRow({
  firstName,
  lastName,
  email,
  contact,
  location,
  message,
}) {
  if (!SHEETS_SPREADSHEET_ID) {
    throw new Error("SHEETS_SPREADSHEET_ID is missing.");
  }

  if (!GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS is missing.");
  }

  const sheets = createSheetsClient();
  const submittedAt = new Date().toISOString();
  const fullName = `${firstName} ${lastName || ""}`.trim();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEETS_SPREADSHEET_ID,
    range: `${SHEETS_TAB_NAME}!A:G`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          submittedAt,
          fullName,
          email,
          contact,
          location,
          message,
        ],
      ],
    },
  });
}

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mail + Sheets server is running.",
  });
});

app.post("/send-mail", async (req, res) => {
  try {
    const { firstName, lastName, email, contact, location, message } =
      req.body || {};

    if (!firstName || !email || !contact || !location || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Email server configuration is missing.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const fullName = `${firstName} ${lastName || ""}`.trim();

    const adminMailOptions = {
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

    const acknowledgementMailOptions = {
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

    await Promise.all([
      appendContactRow({
        firstName,
        lastName,
        email,
        contact,
        location,
        message,
      }),
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(acknowledgementMailOptions),
    ]);

    return res.status(200).json({
      success: true,
      message: "Email sent and spreadsheet updated successfully.",
    });
  } catch (error) {
    console.error("Mail/Sheets error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to process contact form.",
    });
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on http://localhost:${SERVER_PORT}`);
});