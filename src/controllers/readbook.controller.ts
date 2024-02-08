import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { UsersBook } from "../entity/UsersBook";
import { Book } from "../entity/Book";
import { Request, Response } from "express";
import { User } from "../entity/User";

export const addUserBook = async(req: Request , res: Response) => {
    try {

        const { userId , bookId } = req.body;

        const newUser = new UsersBook();
        newUser.user = userId;
        newUser.book = bookId;

        const userRepo = AppDataSource.getRepository(UsersBook);
        await userRepo.save(newUser);
        
        return res.status(201).send({message : "user's book added!"})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const updateUserBook = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;
        const { readStatus , userId , bookId } = req.body;

        const userRepo = AppDataSource.getRepository(UsersBook);
        const updatedUser = await userRepo.findOneBy({id : id});

        updatedUser.user = userId;
        updatedUser.book = bookId;
        updatedUser.readStatus = readStatus;

        await userRepo.save(updatedUser);
        
        return res.status(201).send({message : "user's book updated"})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const getAllUsersBook = async(req: Request , res: Response) => {
    try {

        const userId = req.params.userId;

        const usersBookRepo = AppDataSource.getRepository(UsersBook);

        // const result = await usersBookRepo.find({ where:{user: {id : userId}} ,relations: ['user', 'book'] });
        const result = await usersBookRepo.find({ where:{user: {id : userId}} ,relations: ['book']});


        res.status(200).json({allbooks : result})
         
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const deleteUserBook = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;

        const userBookRepo = AppDataSource.getRepository(UsersBook);
        const removeReadBook = await userBookRepo.findBy({id})

        await userBookRepo.remove(removeReadBook);

        res.status(200).json({message:"data removed successfully!"})
        
    } catch (err) {
        console.log('err: ', err);
        
        res.status(400).json({error: err})
        
    }
}