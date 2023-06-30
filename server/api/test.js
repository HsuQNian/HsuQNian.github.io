import mongoose from "mongoose";
const test = mongoose.model("test", {}, "test");
export default defineEventHandler(async (event) => {
  await mongoose.connect(
    "mongodb+srv://HsuQNian:qiaonian233@hsuqnian.l84ogxp.mongodb.net/?retryWrites=true&w=majority"
  );
  const results = await test.find({});
  mongoose.connection.close();
  return { code: 200, author: "HsuQNian", results: results };
});
