import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRoleType } from '../../infra/shared/type';
import { Task } from '../task/task.entity';
import { Project } from '../project/project.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', nullable: true })
  firstName: string;

  @Column({ type: 'varchar', nullable: true })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  login: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  phone: string;

  @Column({ type: 'varchar', nullable: true })
  bone: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'int', default: 1 })
  role: UserRoleType;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  createdAt: string;

  @OneToMany(() => Task, (task) => task.assignee)
  assigneeTasks: Task[];

  @OneToMany(() => Task, (task) => task.creator)
  createdTasks: Task[];

  @OneToMany(() => Project, (project) => project.owner)
  ownedProjects: Project[];

  @ManyToMany(() => Project, (project) => project.members, {
    onDelete: 'CASCADE',
  })
  projects: Project[];

  public isPasswordValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
