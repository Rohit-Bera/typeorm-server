import { Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Request, Response } from "express";

export const addUser = async(req: Request , res: Response) => {
    try {

        const { name , email , password } = req.body;

        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;

        const userRepo = AppDataSource.getRepository(User);
        await userRepo.save(newUser);
        
        return res.status(201).send({message : 'user added' , user: newUser })
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const updateUser = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;
        const { name , email , password } = req.body;

        const userRepo = AppDataSource.getRepository(User);
        const updatedUser = await userRepo.findOneBy({id : id});

        updatedUser.name = name;
        updatedUser.email = email;
        updatedUser.password = password;

        await userRepo.save(updatedUser);
        
        return res.status(201).send({message : 'user added'})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const searchUser = async(req: Request , res: Response) => {
    try {

        const name = req.params.name

        const userRepo = AppDataSource.getRepository(User);
        const userFound = await userRepo.findBy({ name : Like( `%${name}%` ) }) 
        console.log('allUser: ', userFound);

        if(userFound.length === 0){
        res.status(201).send({message:"No users found!"})

        return
        }
        
        res.status(201).send({message:"success" , user: userFound})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const getAllUsers = async(req: Request , res: Response) => {
    try {

        const userRepo = AppDataSource.getRepository(User);
        const allUser = await userRepo.find();
        console.log('allUser: ', allUser);
        
        return res.status(201).send({message:"success" , users: allUser})
        
    } catch (err) {
        console.log('err: ', err);

        res.status(400).json({error: err})
    }
}

export const deleteUser = async(req: Request , res: Response) => {
    try {

        const id = req.params.id;

        const userRepo = AppDataSource.getRepository(User);
        const removeUser = await userRepo.findBy({id})

        await userRepo.remove(removeUser);

        res.status(200).json({message:"user deleted successfully!"})
        
    } catch (err) {
        console.log('err: ', err);
        
        res.status(400).json({error: err})
        
    }
}