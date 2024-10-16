const QRCode = require('qrcode');

const MemberQrCode = async (id) => {
    try {
        const memberId = id.toString();
        console.log("User ID: ",memberId);
        const url = await QRCode.toDataURL(memberId);
        console.log('QR: ', url);
        return url;
    } catch (error) {
        console.log("Error: ", error);
        throw error;
    };
}

module.exports = MemberQrCode;
