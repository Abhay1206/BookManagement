import jwt from 'jsonwebtoken'
import express from 'express'

export class jwtservice{
    async generateToken(id){
      const token = jwt.sign({id:id},'SECRET_KEY',{expiresIn:'2h'})
      return token
    }

    async verifyToken(req,res,next){
      const token = req.headers.authorization
      try{
        const decoded= jwt.verify(token,'SECRET_KEY')
        console.log(decoded)
        return true
      }catch(err){
        console.log(err)
        return false
      }
    }


    async extractUserId(token){
      try{
        const decoded= jwt.verify(token,'SECRET_KEY')
        return decoded.id
      }catch(err){
        console.log(err)
      }
    }

}