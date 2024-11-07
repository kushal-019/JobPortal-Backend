import mongoose from 'mongoose';

const connectDB=async()=>{
    try {    
        const connect = await mongoose.connect(process.env.MONGOOSE_URL)
        .then(() => console.log('Connected!'));
    } catch (error) {
        console.log("Error conneecting database");
    }
}

export default connectDB;