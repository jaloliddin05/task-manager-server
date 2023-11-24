import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../task/task.entity';
import { Project } from '../project/project.entity';

@Entity('section')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column({type:"int"})
  index:number

  @OneToMany(()=>Task, task=>task.section)
  tasks:Task[]

  @ManyToOne(()=>Project, project=>project.sections,{
    onDelete:"CASCADE",
    cascade:true
  })
  @JoinColumn()
  project:Project
}
