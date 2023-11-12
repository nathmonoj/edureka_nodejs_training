import mongoose from 'mongoose'

// DB Connection
const mongoConnect = async () => {
  await mongoose.connect('mongodb://127.0.0.1/EdurekaFinalAssignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection;
};
export default mongoConnect;