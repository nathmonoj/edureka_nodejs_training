import mongoose from 'mongoose';

// DB Connection
const mongoConnect = async () => {
  await mongoose.connect('mongodb://127.0.0.1/EdurekaDay9', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return mongoose.connection;
};
export default mongoConnect;


/* const mongoClient = connect('mongodb://127.0.0.1/EdurekaDay9', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoClient
mongoClient.connection.close(true, () => {
  console.log('closed')
})
export default mongoClient */
