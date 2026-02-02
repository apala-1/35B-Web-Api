import { CreateUserDTO, LoginUserDTO, UpdateUserDTO } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { HttpError } from "../errors/http-error";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index";

let userRepository = new UserRepository();

export class UserService {

    async createUser(data: CreateUserDTO){
        // business logic before creating user
        const emailCheck = await userRepository.getUserByEmail(data.email);
        if(emailCheck){
            throw new HttpError("Email already in use", 403);
        }
        const usernameCheck = await userRepository.getUserByUsername(data.username);
        if(usernameCheck){
            throw new HttpError("Username already in use", 403);
        }
        // hash password
        const hashedPassword = await bcryptjs.hash(data.password, 10); // 10 complexity
        data.password = hashedPassword;

        // create user
        const newUser = await userRepository.createUser(data);
        return newUser;
    }

    async loginUser(data: LoginUserDTO){
        const user =  await userRepository.getUserByEmail(data.email);
        if(!user){
            throw new HttpError("Invalid Credentials", 401);
        }
        // compare password
        const isPasswordValid = await bcryptjs.compare(data.password, user.password);
        // plaintext, hashed
        if(!isPasswordValid){
            throw new HttpError("Invalid Credentials", 401);
        }
        // generate jwt
        const payload = { // user identifier
            id: user._id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
        return { token, user };
    }

    async getIserById(id: string) {
        const user = await userRepository.getUserById(id);
        if(!user) {
            throw new HttpError("User not found", 404);
        }
        return user;
    }

    async updateUser(id: string, data: UpdateUserDTO){
        const user = await userRepository.getUserById(id);
        if(!user){
            throw new HttpError("User not found", 404);
        }
        if(user.email != data.email){
            const emailCheck = await userRepository.getUserByEmail(data.email!);
            if(emailCheck) {
                throw new HttpError("Email already in use", 403);
            }
        }
        if(user.username != data.username){
            const usernameCheck = await userRepository.getUserByUsername(data.username!);
            if(usernameCheck) {
                throw new HttpError("Username already in use", 403);
            }
        }
        if(data.password){
            // hash new password
            const hashedPassword = await bcryptjs.hash(data.password, 10);
            data.password = hashedPassword;
        }
        const updatedUser = await userRepository.updateUser(id, data);
        return updatedUser;
    }
}