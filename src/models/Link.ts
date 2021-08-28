import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToMany, ManyToOne} from "typeorm";
import { User } from "./User";

@Entity("links")
export class Link{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    value: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.links)
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;


}