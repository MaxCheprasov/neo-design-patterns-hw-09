import * as fs from 'fs';
import { DataExporter } from './DataExporter';

export class JsonExporter extends DataExporter {
  protected render(): void {
    this.result = JSON.stringify(this.transformedData, null, 2);
  }

  protected save(): void {
    this.ensureDirectoryExists();
    fs.writeFileSync('./dist/users.json', this.result, 'utf-8');
  }
}