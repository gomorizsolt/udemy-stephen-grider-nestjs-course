import { IsString } from 'class-validator';

// a DTO class - describes the different properties the request body should have
export class CreateMessageDto {
  @IsString()
  content: string;
}
