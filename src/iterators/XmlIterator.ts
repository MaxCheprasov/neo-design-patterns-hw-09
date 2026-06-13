import { readFileSync, existsSync } from "fs";
import { UserData } from "../data/UserData";
import { XMLParser } from "fast-xml-parser";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    if (!existsSync(filePath)) return;
    const fileContent = readFileSync(filePath, 'utf-8');
    const parser = new XMLParser();
    const jsonObj = parser.parse(fileContent);

    let parsedUsers = jsonObj.users?.user || [];
    // fast-xml-parser повертає об'єкт, якщо елемент один. Робимо масивом.
    if (!Array.isArray(parsedUsers)) {
      parsedUsers = [parsedUsers];
    }

    this.users = parsedUsers.map((u: any) => ({
      id: Number(u.id),
      name: String(u.name),
      email: String(u.email),
      phone: String(u.phone)
    }));
  }

  *[Symbol.iterator]() {
    for (const user of this.users) {
      yield user;
    }
  }
}