import { Entity , PrimaryGeneratedColumn , Column , CreateDateColumn , UpdateDateColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

@Entity()
export class UsersBook{
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({default: "pending"})
    readStatus: string
    
    @ManyToOne(() => User , (user) => user.id)
    user: User

    @ManyToOne(() => Book , (book) => book.id)
    book: Book

}