const nodemailer = require('nodemailer');
const MemberQrCode = require('../QrCodes/MembersQr');

const MemberRegistrationEmail = async (to, id) => {
    try {
        const qrCode = await MemberQrCode(id);

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_EMAIL_PASS,
            },
        });

        let mailOptions = {
            from: process.env.FROM_EMAIL,
            to: to,
            subject: 'Welcome to Revive Fitness!',
            text: 'Welcome to our gym! Here is your membership QR code.',
            html: `
                <div>
                    <h1>Welcome to Revive Fitness!</h1>
                    <p>Dear Member,</p>
                    <p>Thank you for enrolling at Revive Fitness! Please find your membership details below:</p>
                    <p><strong>Member ID:</strong> ${id}</p>
                    <p>Use the following QR code for membership validation at the gym:</p>
                    <img src="cid:qrCodeImage" alt="Membership QR Code" style="width:200px; height:200px;" />
                    <p>We look forward to seeing you at the gym!</p>
                    <p>Best regards,<br/>Revive Fitness Team</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCode.split("base64,")[1],
                    encoding: 'base64',
                    cid: 'qrCodeImage'
                }
            ]
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent to", to);

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
}

module.exports = MemberRegistrationEmail;
