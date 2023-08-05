
const mongoose=require('mongoose')
const schema=mongoose.Schema;

let productdata=new schema({
//     id: faker.datatype.uuid(),
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     image: faker.random.image(),
//     inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
//     fastDelivery: faker.datatype.boolean(),
//     ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
//   }));


    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    inStock:{
        type:Number,
        required:true,

    },
    fastDelivery :  {
        type: Boolean,
        required:true,
    },
    ratings:{
        type:Number,
        enum:{

            values:[1,2,3,4,5],
            message:`Value is not suppoting`,
        },
        required:true,
    }

},
    {
        collection:"productData"
    }
)
//collection name will be tableData
module.exports=mongoose.model("ProductData",productdata)