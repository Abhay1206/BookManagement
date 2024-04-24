import express from 'express'
import { dbservice } from '../service/index.js'
import { jwtservice } from '../service/jwtutil.js'
import { UserLoginSchema,UserRegisterSchema,BookSaveSchema } from '../service/validation.js'

const service = new dbservice()
const jwt_service = new jwtservice()
const router = express.Router()

/**
 * @swagger
 * /saveUser:
 *   post:
 *     summary: Saves user to database
 *     description: Save a user to database
 *     responses:
 *       200:
 *         description: Successfully saved user
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 */
router.post('/saveUser',async (req,res)=>{
  const {error,val}=UserRegisterSchema.validate(req.body)
  if(error){
    return res.status(400).json(error.details[0].message)
  }else{
    const flag = await service.saveUSer(req.body)
  console.log(flag)
  return res.status(200).json(flag)
  }
  
})

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Login the user
 *     responses:
 *       200:
 *         description: Successfully logined user
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 */
router.post('/login',async (req,res)=>{
  const {error,val}=UserLoginSchema(req.body)
  if(error){
    return res.status(400).json(error.details[0].message)
  }else{
    const user = await service.getUserByEmail(req.body.email)
    console.log(user.id)
    if(!user){
      return res.json("No user found")
    }else{
      const token = await jwt_service.generateToken(user.id)
      return res.status(200).json(token)
    }
  }
})

/**
 * @swagger
 * /addBook:
 *   post:
 *     summary: Saves book to database
 *     description: Save a book to database
 *     responses:
 *       200:
 *         description: Successfully saved book
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 */
router.post('/addBook',async (req,res)=>{
    const {error,val}=BookSaveSchema.validate(req.body)
    if(error){
      return res.status(400).json(error.details[0].message)
    }else{
      const verifyTokenFlag=await jwt_service.verifyToken(req,res)
      if(verifyTokenFlag){
        const userId= await jwt_service.extractUserId(req.headers.authorization)
        const flag = await service.saveBookDetails({userId,...req.body})
        res.status(200).json(flag)
      }else{
        return res.status(401).json("Unauthiriozed")
      }

    }
   
})

/**
 * @swagger
 * /getById/:id:
 *   get:
 *     summary: get book from database
 *     description: get a book from database
 *     responses:
 *       200:
 *         description: Successfully got book
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 */

router.get('/getById/:id',async function(req,res){
  const verifyTokenFlag=await jwt_service.verifyToken(req,res)
  if(verifyTokenFlag){
    const data = await service.getBookByid(req.params.id)
    if(data==null){
        res.status(200).send({data:"No data is foud for this id"})
    }else{
        res.status(200).send({data:data})
    }
  }else{
    return res.status(401).json("Unauthiriozed")
  }
   
})

/**
 * @swagger
 * /filter:
 *   get:
 *     summary: filter books 
 *     description: filter books by publishyear and author name 
 *     responses:
 *       200:
 *         description: Successfully got list of books
 *         content:
 *           application/json:
 *       500:
 *         description: Internal Server Error
 */

router.get('/filter',async function(req,res){
  console.log(req.query)
  const verifyTokenFlag=await jwt_service.verifyToken(req,res)
  if(verifyTokenFlag){
      let filters ={}
      const {authorName,publishYear}=req.query;
      if(authorName){
        filters={...filters,authorName}
      }
      if(publishYear){
        filters={...filters,publishYear}
      }
      const data = await service.getAll(filters)
      res.status(200).json(data)
  }else{
    return res.status(401).json("Unauthiriozed")
  }
})






export default router