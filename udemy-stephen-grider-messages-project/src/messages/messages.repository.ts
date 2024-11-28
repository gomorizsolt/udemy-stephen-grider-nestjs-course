import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findAll() {
    const messages = await this.#loadMessages();

    return messages;
  }

  async findOne(id: string) {
    const messages = await this.#loadMessages();

    return messages[id];
  }

  async create(message: string) {
    const messages = await this.#loadMessages();

    const id = Object.keys(messages).length + 1;

    return writeFile(
      'messages.json',
      JSON.stringify({
        ...messages,
        [id]: {
          id,
          content: message,
        },
      }),
    );
  }

  async delete(id: string) {
    const messages = await this.#loadMessages();

    const { [id]: deletedMessage, ...restMessages } = messages;

    if (!deletedMessage) return;

    await writeFile('messages.json', JSON.stringify(restMessages));

    return deletedMessage;
  }

  async #loadMessages() {
    return JSON.parse(await readFile('messages.json', 'utf8'));
  }
}
