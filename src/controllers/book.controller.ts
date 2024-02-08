import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Request, Response } from "express";

export const addBook = async(req: Request , res: Response) => {
    try {

        const { bookName , author , genre } = req.body;

        const newBook = new Book();
        newBook.bookName = bookName;
        newBook.author = author;
        newBook.genre = genre;

        const BookRepo = AppDataSource.getRepository(Book);
        await BookRepo.save(newBook);
        
        return res.status(201).send({message : 'Book added'})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const updateBook = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;
        const { bookName , author , genre } = req.body;

        const BookRepo = AppDataSource.getRepository(Book);
        const updatedBook = await BookRepo.findOneBy({id : id});

        updatedBook.bookName = bookName;
        updatedBook.author = author;
        updatedBook.genre = genre;

        await BookRepo.save(updatedBook);
        
        return res.status(201).send({message : 'Book added'})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const searchBook = async(req: Request , res: Response) => {
    try {

        const name = req.params.name

        const BookRepo = AppDataSource.getRepository(Book);
        const BookFound = await BookRepo.findBy({ bookName : Like( `%${name}%` ) }) 
        console.log('allBook: ', BookFound);

        if(BookFound.length === 0){
        res.status(201).send({message:"No Books found!"})

        return
        }
        
        res.status(201).send({message:"success" , Book: BookFound})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const getAllBooks = async(req: Request , res: Response) => {
    try {

        const BookRepo = AppDataSource.getRepository(Book);
        const allBook = await BookRepo.find();
        console.log('allBook: ', allBook);
        
        return res.status(201).send({message:"success" , Books: allBook})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const deleteBook = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;

        const bookRepo = AppDataSource.getRepository(Book);
        const removeBook = await bookRepo.findBy({id})

        await bookRepo.remove(removeBook);

        res.status(200).json({message:"book removed successfully!"})
        
    } catch (err) {
        console.log('err: ', err);
        
        res.status(400).json({error: err})
        
    }
}