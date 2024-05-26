import mongoose from "mongoose";

const database_url: string | undefined = process.env.DB_URL || "mongodb://localhost:27017/whatsapp";

mongoose.connect(database_url)
    .then(() => console.log('Connected!')).catch((err) => console.log(err));