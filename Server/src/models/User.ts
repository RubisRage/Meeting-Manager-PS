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

    /*constructor(user_name: string, pwhash: string, real_name: string, img: any){
        this.user_name = user_name;
        this.pwhash = pwhash;
        this.real_name = real_name;
        this.img = img;
    }*/
}

export default User