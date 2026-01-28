const {z} = require('zod');


const userValidationSchema = z.object({
    name: z.string().min(3,"Name Should be of length more than 3"),
    email: z.string().email("Inavlid email Format"),
    password:z.string().min(5,"Password should be more than 5 digits")
})

module.exports = userValidationSchema;