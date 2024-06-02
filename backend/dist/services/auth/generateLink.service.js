"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateActivationLink = void 0;
function generateActivationLink(token) {
    const frontend_url = process.env.FRONTEND_URL;
    const link = `${frontend_url}/${token}`;
    return link;
}
exports.generateActivationLink = generateActivationLink;
