const { default: mongoose } = require("mongoose");

async function connectDb(){
    await mongoose.connect('mongodb+srv://salahucv:salu7510@authsample.qy1qflh.mongodb.net/learn_node?retryWrites=true&w=majority');
}

module.exports = connectDb;