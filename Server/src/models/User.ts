import {Entity, PrimaryColumn, Column, OneToMany, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Organization from "./Organization";
import Belongs from "./Belongs";

@Entity({ name: "users", synchronize: true})
export class User{

    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column({unique: true, nullable: false})
    username!: string;

    @Column() 
    pwhash!: string;

    @Column()
    fullname!: string;

    @Column({
        nullable: true
    })
    imgURL!: string;

    @OneToMany(() => Belongs, belongsToOrganizations => belongsToOrganizations.user)
    belongsToOrganizations!: Belongs[]
}

export default User