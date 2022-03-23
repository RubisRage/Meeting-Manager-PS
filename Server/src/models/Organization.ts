import internal from "stream";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ synchronize: false })
class Organization {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    inf!: string;

    @Column({ type: "bytea"})
    img: any;
}

export default Organization;
