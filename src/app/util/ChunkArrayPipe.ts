import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chunkArray',
  standalone: true
})
export class ChunkArrayPipe implements PipeTransform {
  transform(array: any[], chunkSize: number): any[] {
    if (!array || !Array.isArray(array)) {
      return [];
    }

    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
