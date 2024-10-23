const nodemailer = require('nodemailer');
const MemberQrCode = require('../QrCodes/MembersQr');

const MemberRegistrationEmail = async (
    to,
    id,
    fullName,
    membershipOption,
    membershipType,
    membershipDuration,
    membershipDate,
    membershipRenewDate,
    membershipExpireDate,
    contactNo,
    dob,
    address,
    finalAmount,
    paidAmount,
    dueAmount
) => {
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
            text: `Dear ${fullName}, welcome to Revive Fitness!`,
            html: `
                <div>
                    <h1>Dear ${fullName},</h1>
                    <p>Welcome to Revive Fitness!</p>
                    <p>
                        We are thrilled to have you as part of our fitness community! Your decision to join us marks the beginning of an exciting journey towards your health and fitness goals. 
                        Our team is dedicated to supporting you every step of the way. Whether you're just starting out or aiming to achieve new milestones, we're here to help you succeed.
                    </p>
                    <p>
                        Remember, consistency is key, and we’ll be with you as you progress. Whether it’s guidance, motivation, or just a friendly face, count on us to be there for you!
                    </p>
                    <p><strong>Use the QR Code below for daily check-ins:</strong></p>
                    <img src="cid:qrCodeImage" alt="Membership QR Code" style="width:200px; height:200px;" />
                    
                    <p><strong>Membership Details:</strong></p>
                    <p><strong>Member ID:</strong> ${id}</p>
                    <p><strong>Membership Option:</strong> ${membershipOption}</p>
                    <p><strong>Membership Category:</strong> ${membershipType}</p>
                    <p><strong>Membership Date:</strong> ${membershipDate}</p>
                    <p><strong>Membership Payment Type:</strong> ${membershipDuration}</p>
                    <p><strong>Membership Renew Date:</strong> ${membershipRenewDate}</p>
                    <p><strong>Membership Expire Date:</strong> ${membershipExpireDate}</p>
                    <p><strong>Email:</strong> ${to}</p>
                    <p><strong>Full Name:</strong> ${fullName}</p>
                    <p><strong>Contact No:</strong> ${contactNo}</p>
                    <p><strong>Date of Birth:</strong> ${dob}</p>
                    <p><strong>Address:</strong> ${address}</p>
                    <p><strong>Final Amount:</strong> ${finalAmount}</p>
                    <p><strong>Paid Amount:</strong> ${paidAmount}</p>
                    <p><strong>Due Amount:</strong> ${dueAmount}</p>
                    <br />
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

module.exports = MemberRegistrationEmail;
