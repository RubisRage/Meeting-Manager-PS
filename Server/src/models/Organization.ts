import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import User from "./User";

@Entity()
class Organization {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({
        nullable: true
    })
    description!: string;

    @Column({
        nullable: true
    })
    imgURL!: string;

    @OneToMany(() => User, (user) => user.organizations)
    users!: User[];
}

export default Organization;
