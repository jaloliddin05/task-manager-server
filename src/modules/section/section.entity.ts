import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;
}
