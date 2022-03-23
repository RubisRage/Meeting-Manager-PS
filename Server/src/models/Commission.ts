import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ synchronize: false })
class Commission{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    text!: string;

    @Column()
    inf!: string;
}

export default Commission;