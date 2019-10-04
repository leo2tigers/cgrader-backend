import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemModule } from './problem/problem.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                uri: config.mongoUrl,
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            }),
        }),
        ConfigModule,
        ProblemModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
