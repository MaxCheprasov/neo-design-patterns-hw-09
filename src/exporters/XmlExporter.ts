import * as fs from 'fs';
import { DataExporter } from './DataExporter';

export class XmlExporter extends DataExporter {
  protected render(): void {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';

    this.transformedData.forEach(u => {
      xml += `
  <user>
    <id>${u.id}</id>
    <name>${u.name}</name>
    <email>${u.email}</email>
    <phone>${u.phone}</phone>
  </user>
`;
    });

    xml += '</users>';
    this.result = xml;
  }

  protected override afterRender(): void {
  this.result += ` \n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
}


  protected save(): void {
    this.ensureDirectoryExists();
    fs.writeFileSync('./dist/users.xml', this.result, 'utf-8');
  }
  }