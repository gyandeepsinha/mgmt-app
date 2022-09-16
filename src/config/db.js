const mongoose  =   require('mongoose');
const connectDB =   async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URL);
        // console.log(`MongoDB Connected : ${connection.connection.host}`);
    }catch(error){
        console.log('error: '+ error);
    }    
}

module.exports = connectDB ;