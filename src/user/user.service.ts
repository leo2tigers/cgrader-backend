import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserRole } from './user.schema';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private readonly model: Model<User>) {}

    findById(id: string): Promise<User> {
        return this.model.findById(id).exec();
    }

    createIfNotExist(id: string, username: string) {
        const tutorRegex = /^99[0-9]{3}$/g;
        const role: UserRole = tutorRegex.test(username)
            ? UserRole.Admin
            : UserRole.Student;
        return this.model.findByIdAndUpdate(
            id,
            { $setOnInsert: { role } },
            { new: true, upsert: true },
        );
    }

    changeRole(id: string, role: UserRole): Promise<User> {
        return this.model.findByIdAndUpdate(id, { role }, { new: true }).exec();
    }
}
