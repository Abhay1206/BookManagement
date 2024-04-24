import joi from 'joi'

export const UserRegisterSchema=joi.object({
    name:joi.string().required(),
    email:joi.string().required(),
    password:joi.string().required()
})
    



export const UserLoginSchema=joi.object({
    email:joi.string().required(),
    password:joi.string().required()
})


export const BookSaveSchema=joi.object({
    name:joi.string().required(),
    authorName:joi.string().required(),
    publishYear:joi.number().required(),
    price:joi.number().required()
})
   
