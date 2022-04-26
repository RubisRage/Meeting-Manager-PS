import {Entity, PrimaryColumn, Column, OneToMany, ManyToMany} from "typeorm";
import Organization from "./Organization";
import Belongs from "./Belongs";

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

    // @ManyToMany(() => Organization, (organization) => organization.users )
    // organizations!: Organization[];

    @OneToMany(() => Belongs, belongsToOrganizations => belongsToOrganizations.user)
    belongsToOrganizations!: Belongs[]
}

export default User