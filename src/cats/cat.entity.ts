import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CatEntity {
  @PrimaryGeneratedColumn()
  name: string;

  @Column()
  age: number;

  @Column({ default: '' })
  breed: string;
}
