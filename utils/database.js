const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect('mongodb+srv://samridhiagnihotri6:ibjMsaVvcCdo3xz8@cluster0.6yvil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    // mongodb+srv://samridhiagnihotri6:ibjMsaVvcCdo3xz8@cluster0.6yvil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    // protocol(connection to cluster)//username:password@clusterURL/query parameters
    .then(() => {
      console.log("Database is successfully connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
