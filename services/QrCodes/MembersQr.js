const QRCode = require('qrcode');

const MemberQrCode = async (id) => {
    try {
        const memberId = id.toString();
        const url = await QRCode.toDataURL(memberId);
        return url;
    } catch (error) {
        throw error;
    };
}

module.exports = MemberQrCode;
