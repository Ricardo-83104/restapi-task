import mongoose from "mongoose";
import config from './config'

//conectarse a mongodb, funcion autoinvocada
(async () => {
   try {
      const db = await mongoose.connect(config.mongodbURL,{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useUnifiedTopology: true,
         useFindAndModify: false
    });
     console.log('Database is connected to', db.connection.name);

   } catch (error) {
      console.log(error);
   }
})();