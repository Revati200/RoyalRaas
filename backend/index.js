const port=4008;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");

const stripe=require("stripe")("sk_test_51PqVupDkiMZlu5KWHYAEcQXoTHZlDqqA7B7Q6wcDQcHrSJ1f00ppZo5mOt0gZ2idHPM0PUK9AagM3lRfZ7jGFaOb003GlDNQEd");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://ecommerce:9325499011@cluster0.upwbf.mongodb.net/royalraas")

app.post("/api-create-checkout-session", async(req,res)=>{
    const product=req.body;

    const lineItmes=product.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.category
            },
            unit_amount:product.price *100,        
        },
        quantity:product.qnty
    }));
   
    const session=await stripe.checkout.sesion.create({
    payment_method_types:["card"],
    line_items:lineItmes,
    mode:"payment",
    sucess_url:"http://localhost:4008/success",
    cancel_url:"http://localhost:4008/cancel",
    });
    res.json({id:session.id})


})

app.get("/",(req,res)=>{
    res.send("Express App is running")
})

const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(re,file,cb)=>{
     return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
   res.json({
    succes:1,
    image_url:`https://localhost:${port}/images/${req.file.filename}`
   })
})
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
       type:String,
       required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
      type:String,
      required:true,
    },
    new_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }

})

app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product= last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:req.body.id,
        name:req.body.name,
        category:req.body.category,
        image:req.body.image,
        new_price:req.body.new_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        succes:true,
        name:req.body.name,
    })
})
app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        succes:true,
        name:req.body.name
    })
})

app.get('/allproducts', async(req,res)=>{
    let products= await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

const Users=mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,

    },
    date:{
        type:Date,
        default:Date.now,
    }

    })

app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false, errors:"existing user found with same email address"});
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    


    await user.save();
    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

app.post('/login', async(req,res)=>{
    let user =await Users.findOne({email:req.body.email});
    if(user){
        const passComapre=req.body.password===user.password;
        if(passComapre){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({succes:true,token});
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false, errors:"Wrong Email Id"});
    }
})
app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on port "+ port)
    }
    else{
        console.log("Error: "+error)
    }
})