import {Entity, PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn} from "typeorm";
import Organization from "./Organization";
import User from "./User";

@Entity({ name: "belongs" })
export class Belongs{
    @PrimaryColumn()
    userId!: string

    @PrimaryColumn()
    id!: string

    @Column({
        nullable: false
    })
    isAdmin!: boolean

    @ManyToOne(() => User, (user: User) => user.belongsToOrganizations, {
        createForeignKeyConstraints: true
    })
    @JoinColumn({name: 'userId'})
    user!: User

    @ManyToOne(() => Organization, (organization: Organization) => organization.belongsToOrganizations, {
        createForeignKeyConstraints: true
    })
    @JoinColumn({name: 'id'})
    organization!: Organization
}

export default Belongs
