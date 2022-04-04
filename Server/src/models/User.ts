import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "users", synchronize: false})
export class User{
    @PrimaryColumn()
    user_name!: string;

    @Column() 
    pwhash!: string;

    @Column()
    real_name!: string;

    /*@Column({ type: "bytea"})
    img: string;*/
}

export default User