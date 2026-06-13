import * as fs from 'fs';
import { DataExporter } from './DataExporter';

export class CsvExporter extends DataExporter {
  protected render(): void {
    const header = 'id,name,email,phone\n';
    const rows = this.transformedData
      .map(u => `${u.id},${u.name},${u.email},${u.phone}`)
      .join('\n');
    this.result = header + rows;
  }

  protected save(): void {
    this.ensureDirectoryExists();
    fs.writeFileSync('./dist/users.csv', this.result, 'utf-8');
  }
}