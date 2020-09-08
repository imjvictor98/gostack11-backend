"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../config/auth"));
const jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('JWT token is missing');
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new Error('Invalid JWT token');
    }
}
exports.default = ensureAuthenticated;
