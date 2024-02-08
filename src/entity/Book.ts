import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn , UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Book{
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({nullable: false})
    bookName: string

    @Column({nullable: false})
    author: string

    @Column("text")
    genre: string

    // @ManyToOne(() => User , (user) => user.books)
    // @JoinColumn()
    // user: User
    
}