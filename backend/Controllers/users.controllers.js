import User from "../Models/user.model.js";

let cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none"
}

const register = async (req, res) => {
  let { email } = req.body;

  try {
    let existUser = await User.findOne({ email: email });

    if (existUser) {
      return res
        .status(400)
        .send({ result: false, message: "Email already exists" });
    }

    let newUser = new User(req.body);

    let userData = await newUser.save();

    let token = await userData.generateToken();

    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .send({
        result: true,
        message: "User created successfully",
        data: userData,
      });
  } catch (error) {
    return res.status(500).send({ result: false, message: error.message });
  }
};

const login = async (req, res) => { };

const logout = async (req, res) => { };

const updateUser = async (req, res) => {
  let { email } = req.body;

  let updatedUser = await User.findOneAndUpdate({ email: email }, req.body, {
    new: true,
  });

  res.send(updatedUser);
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).send({ count: users.length, data: users });
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

export {
  register,
  login,
  logout,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
