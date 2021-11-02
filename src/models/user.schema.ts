import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Document, set } from 'mongoose';

//User Schema for MongoDb
export type UserDocument = User & Document;

//Strict = false
@Schema({ strict: false })
export class User {
  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  surname: string;

  @ApiProperty()
  @Prop({ unique: true, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  @IsNotEmpty()
  phone_number: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
