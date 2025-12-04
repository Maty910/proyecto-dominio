"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserUseCase = exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(message = "Invalid credentials") {
        super(message);
        this.name = "AuthenticationError";
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthenticateUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email, passwordHash) {
        const user = await this.userRepo.findByEmail(email);
        if (!user)
            throw new AuthenticationError();
        if (user.passwordHash !== passwordHash)
            throw new AuthenticationError();
        return user;
    }
}
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;
