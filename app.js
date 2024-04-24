import sequelize from "./service/sequelize.js"
import express from 'express'
import router from './router/index.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const app = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())

const options = {
    definition: {
        openapi: '3.0.0', 
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API'
        },
        servers: [
            {
                url: 'http://localhost:3000/api', 
            },
        ],
    },
    apis: ['./router/index.js'], 
};

const specs = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api",router)
app.listen(PORT,()=>{
    console.log("Server is running")
})