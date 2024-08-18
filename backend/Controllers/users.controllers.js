import User from "../Models/user.model.js";

const createUser = async (req, res) => {
  let data = req.body;
  console.log("hello")

  let newUser = new User(data);

  let userData = await newUser.save();

  res.send(userData);
};


const updateUser = async (req, res) => {
  let { email } = req.body;

  let updatedUser = await User.findOneAndUpdate({ email: email }, req.body, { new: true })

  res.send(updatedUser)
}

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    let deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
};


export { createUser, updateUser, getAllUsers, getUserById, deleteUser };