import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './messages.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const msg = await this.messagesService.findOne(id);

    if (!msg) {
      throw new NotFoundException('Message not found');
    }

    return msg;
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Delete('/:id')
  async deleteMessage(@Param('id') id: string) {
    const msg = await this.messagesService.delete(id);

    if (!msg) {
      throw new NotFoundException('Message not found');
    }

    return msg;
  }
}
