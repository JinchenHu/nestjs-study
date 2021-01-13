import { EntitySchema } from 'typeorm';
import { CatEntity } from './cat.entity';

export const UserSchema = new EntitySchema<CatEntity>({
  name: 'CatEntity',
  target: CatEntity,
  columns: {
    name: {
      type: String,
      primary: true,
      generated: true,
    },

    age: {
      type: Number,
    },

    breed: {
      type: String,
      default: '',
    },
  },
});
