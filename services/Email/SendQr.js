const nodemailer = require('nodemailer');
const MemberQrCode = require('../QrCodes/MembersQr');

const SendQr = async (to, id, fullName,) => {
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
            subject: 'QR Code',
            text: `Dear ${fullName}, welcome to Revive Fitness!`,
            html: `
                <div>
                    <h1>Dear ${fullName},</h1>

                    <p><strong>Please use this+ QR Code below for daily check-ins:</strong></p>
                    <img src="cid:qrCodeImage" alt="Membership QR Code" style="width:200px; height:200px;" />
                    
                    <p><strong>Details:</strong></p>
                    <p><strong>Member ID:</strong> ${id}</p>

                    <p>Thank you.<br />Best regards,<br />Revive Fitness Team</p>
                </div>
            `,
            attachments: [
                {
                    filename: 'qrcode.png',
                    content: qrCode.split("base64,")[1],
                    encoding: 'base64',
                    cid: 'qrCodeImage',
                },
            ],
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email sent to", to);

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
};

module.exports = SendQr;
