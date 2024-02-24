import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/library-management');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;