import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Section } from '../section/section.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: string;

  @ManyToOne(() => User, (user) => user.assigneeTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  assignee: User;

  @ManyToOne(() => User, (user) => user.createdTasks, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  creator: User;

  @ManyToOne(() => Section, (section) => section.tasks, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn()
  section: Section;
}
