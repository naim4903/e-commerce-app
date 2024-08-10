import User from "../Models/user.model.js";

const createUser = async (req, res) => {
  let data = req.body;
  console.log("hello")

  let newUser = new User(data);

  let userData = await newUser.save();

  res.send(userData);
};



export {createUser};