import {Entity, PrimaryColumn, Column, OneToMany} from "typeorm";
import Organization from "./Organization";

@Entity({ name: "users", synchronize: true})
export class User{
    @PrimaryColumn()
    username!: string;

    @Column() 
    pwhash!: string;

    @Column()
    fullname!: string;

    @Column({
        nullable: true
    })
    imgURL!: string;

    @OneToMany(() => Organization, (organization) => organization.users )
    organizations!: Organization[];
}

export default User