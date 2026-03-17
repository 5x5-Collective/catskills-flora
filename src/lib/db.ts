import Dexie, { Table } from 'dexie';
import { SpecimenEntry } from './types';

export class CatskillsFloraDB extends Dexie {
  specimens!: Table<SpecimenEntry>;

  constructor() {
    super('CatskillsFloraDB');
    this.version(1).stores({
      specimens: 'id, speciesId, dateFound, season, createdAt'
    });
  }
}

export const db = new CatskillsFloraDB();
