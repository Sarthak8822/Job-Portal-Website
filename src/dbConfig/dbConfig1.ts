import mongoose from 'mongoose';

export async function connect1() {
    try {
        await mongoose.connect(process.env.MONGO_URI1!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully!')
        })
        connection.on('error', (err) =>{
            console.log("Connection Error " + err)
            process.exit()
        })
    } catch (error) {
        console.log("Something went Wrong");
        console.log(error)
    }
}