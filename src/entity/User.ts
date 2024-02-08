import { Entity, PrimaryGeneratedColumn, Column , CreateDateColumn , UpdateDateColumn, OneToMany, JoinColumn  } from "typeorm"
import { Book } from "./Book"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    // @OneToMany(() => Book , (book) => book.user)
    // @JoinColumn()
    // books: Book[]

}
