import { readFileSync, existsSync } from 'fs';
import { UserData } from '../data/UserData';

export class JsonIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    if (!existsSync(filePath)) return;
    const fileContent = readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(fileContent);
  }

  *[Symbol.iterator]() {
    for (const user of this.users) {
      yield user;
    }
  }
}