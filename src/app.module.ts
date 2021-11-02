import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/base.controllers';
import { User, UserSchema } from './models/user.schema';
import { UserService } from './services/base.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/siu'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
