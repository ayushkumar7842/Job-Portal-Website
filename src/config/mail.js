import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter object using SMTP (configured once)

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send an email
const sendEmail = async (to, subject, text, from = process.env.EMAIL_USER) => {
  try {
    // Define the email configuration
    const mailOptions = { from, to, subject, text };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
    throw error; // Rethrow the error for better error handling
  }
};

// Export the function for use in other files
export default sendEmail;
