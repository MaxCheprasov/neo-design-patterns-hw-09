import * as fs from 'fs';
import { UserData } from '../data/UserData';

export abstract class DataExporter {
  protected users: any[] = [];
  protected transformedData: UserData[] = [];
  protected result: string = '';

  // Шаблонний метод
  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.render();
    this.afterRender();
    this.save();
  }

  protected async load(): Promise<void> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    this.users = await response.json();
  }

  protected transform(): void {
    this.transformedData = this.users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {} // Hook
  protected abstract render(): void;
  protected afterRender(): void {}  // Hook
  protected abstract save(): void;

  protected ensureDirectoryExists(): void {
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }
  }
}