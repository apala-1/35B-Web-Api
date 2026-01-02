import { UserRepository } from "../../repositories/user.repository";
import bcryptjs from "bcryptjs";
import { CreateUserDTO } from "../../dtos/user.dto";
import { HttpError } from "../../errors/http-error";

let userRepository = new UserRepository();

export class AdminUserService {
    async createUser(userData: CreateUserDTO) {
        // same as src/services/user.service.ts
    }
    async getAllUsers() {
        const users = await userRepository.getAllUsers();
        // transformation or filtration logic can be added here
        return users;
    }
    async getUserById(id: string) {
        const user = await userRepository.getUserById(id);
        if (!user) {
            throw new HttpError("User not found", 404);
        }
        return user;
    }
    async updateUser(id: string, updateData: Partial<CreateUserDTO>) {
        if (updateData.password) {
            const salt = await bcryptjs.genSalt(10);
            updateData.password = await bcryptjs.hash(updateData.password, salt);
        }
        const updatedUser = await userRepository.updateUser(id, updateData);
        if (!updatedUser) {
            throw new HttpError("User not found", 404);
        }
        return updatedUser;
    }
    async deleteUser(id: string) {
        const isDeleted = await userRepository.deleteUser(id);
        if (!isDeleted) {
            throw new HttpError("User not found", 404);
        }
        return isDeleted;
    }
}