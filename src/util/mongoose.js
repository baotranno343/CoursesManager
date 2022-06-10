module.exports = {
  mutipleMongooseToObject: function (mongosees) {
    return mongosees.map((mongosee) => mongosee.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
