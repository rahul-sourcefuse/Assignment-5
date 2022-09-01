import { Request,Response } from "express";
import { QueryResult } from "pg";

import { pool } from "../database";


export const getUsers=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const response:QueryResult=await pool.query('SELECT * from userstable');
        return res.status(200).send(response.rows);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const getUserById=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        const response:QueryResult=await pool.query('SELECT * from userstable where id= $1',[id]);
        return res.status(200).send(response.rows);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const createUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const {firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj} =req.body;
        await pool.query('INSERT INTO userstable (firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj)VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj]);
        return res.json({
            message:'User created Successfully',
            body:{
                user:{
                    firstName,
                    middleName,
                    lastName,
                    email,
                    phoneNumber,
                    Role, 
                    Address,
                    Doj
                }
            }
        })
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const updateUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        const {firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj} =req.body;
        await pool.query('UPDATE userstable SET firstName = $1, middleName  = $2, lastName = $3 ,email = $4 ,phoneNumber = $5 ,Role = $6 , Address  = $7 ,Doj = $8 where id= $9',[firstName, middleName,lastName,email,phoneNumber,Role, Address,Doj,id]);
        return res.json(`User ${id} updated successfully`);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}

export const deleteUser=async(req:Request,res:Response):Promise<Response>=>{
    try{
        const id=req.params.id;
        await pool.query('DELETE FROM userstable WHERE id= $1',[id]);
        return res.json(`User ${id} deleted successfully`);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal Server Error');
    }
}