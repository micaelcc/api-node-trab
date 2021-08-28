import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn} from "typeorm";
import {Link} from './Link';
@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    email: string;

    @Column()
    password_hash: string;

    @OneToMany(() => Link, link => link.user)
    links: Link[]

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;


}