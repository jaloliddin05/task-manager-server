import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Section } from '../section/section.entity';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', default: 'secondary' })
  color: string;

  @ManyToOne(() => User, (user) => user.ownedProjects, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  owner: User;

  @ManyToMany(()=>User, user=>user.projects,{
    cascade:true,
    onDelete:"CASCADE"
  })
  @JoinTable()
  members:User[]

  @OneToMany(()=>Section, section=>section.project)
  sections:Section[]
}
