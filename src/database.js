import mongoose from "mongoose";

const url =
  "mongodb+srv://kdrai007:kdrai987@cluster0.xrkhj.mongodb.net/placement?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
function Database() {
  mongoose.connect(url, (err) => {
    if (err) {
      console.log("Authentication error! ", err);
    } else {
      console.log("Connection with database established");
    }
  });
}
export default Database;
