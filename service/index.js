import db from '../models/index.js'

export class dbservice{

    async saveUSer(data){
        console.log(data)
        try{
            await db.user.upsert({
               name:data.name,
               email:data.email,
               password:data.password
            })
            return true
        }catch(err){
            return false
        }
    }

    async saveBookDetails(data){
      try{
        await db.book.upsert({
            name:data.name,
            userId:data.userId,
            authorName:data.authorName,
            publishYear:data.publishYear,
            price:data.price
        })
        return true
      }catch(err){
        return false;
      }
    }

    async getBookByid(id){
        try{
            return await db.book.findOne({
                where:{
                    id:id
                }
            })
        }catch(err){
            console.log(err)
        }
    }


    async getUserByEmail(email){
        try{
            return await db.user.findOne({
                where:{
                    email:email
                }
            })
        }catch(err){
            console.log(err)
        }
    }

    async getAll(filters){
        try{
            return await db.book.findAll({
                where:filters,
            })
        }catch(err){
            console.log(err)
        }
    }

    
}