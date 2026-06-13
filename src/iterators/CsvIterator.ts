import { readFileSync, existsSync } from 'fs';
import { UserData } from '../data/UserData';

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    if (!existsSync(filePath)) return;
    const fileContent = readFileSync(filePath, 'utf-8');
    const lines = fileContent.trim().split('\n');
    lines.shift(); // Пропускає заголовок

    this.users = lines.map(line => {
      const [id, name, email, phone] = line.split(',');
      return { id: Number(id), name, email, phone };
    });
  }

  *[Symbol.iterator]() {
    for (const user of this.users) {
      yield user;
    }
  }
}