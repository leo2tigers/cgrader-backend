import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserModel, schema: UserSchema }]),
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
