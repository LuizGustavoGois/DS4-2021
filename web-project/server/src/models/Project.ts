import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StatusColumn } from "./StatusColumn";
import { Task } from "./Task";
import { User } from "./User";



@Entity('project')
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({name: 'user_id'})
    ornwner: User;

    @OneToMany(() => StatusColumn, statuscolumn => statuscolumn.project, {
        eager: true,
        cascade: true
    })
    statusCollumns: StatusColumn[];

    @OneToMany(() => Task, task => task.project, {
        eager: true,
        cascade: true
    })
    tasks: Task[];

    @CreateDateColumn({name: 'created_at'})
    createAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}
