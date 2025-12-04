"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserUseCase = exports.UserAlreadyExistsError = void 0;
const User_1 = require("../entities/User");
const uuid_1 = require("uuid");
class UserAlreadyExistsError extends Error {
    constructor(message = "User already exists") {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class RegisterUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(email, passwordHash, role = "customer") {
        const existing = await this.userRepo.findByEmail(email);
        if (existing)
            throw new UserAlreadyExistsError();
        const user = new User_1.User({
            id: (0, uuid_1.v4)(),
            email,
            passwordHash,
            role
        });
        await this.userRepo.save(user);
        return user;
    }
}
exports.RegisterUserUseCase = RegisterUserUseCase;
