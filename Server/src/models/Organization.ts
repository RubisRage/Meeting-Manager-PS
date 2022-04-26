import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import User from "./User";
import Belongs from "./Belongs";

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

    // @ManyToMany(() => User, (user) => user.organizations)
    // users!: User[];

    @OneToMany(() => Belongs, belongsToOrganizations => belongsToOrganizations.user)
    belongsToOrganizations!: Belongs[];
}

export default Organization;
