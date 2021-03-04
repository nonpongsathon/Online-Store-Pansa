const db = require("../models");
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const targetUser = await db.User.findOne({ where: { email: email } });
  if (targetUser) {
    res.status(400).send({ message: "Email is already taken." });
  } else {
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    };
    const newUserSignin = await db.User.create(newUser);

    const payload = {
      id: newUserSignin.id,
      name: newUserSignin.name,
      email: newUserSignin.email,
      isAdmin: newUserSignin.isAdmin,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });

    res.status(200).send({
      message: "User created successfully",
      id: newUserSignin.id,
      name: newUserSignin.name,
      email: newUserSignin.email,
      isAdmin: newUserSignin.isAdmin,
      token: token,
    });
  }
});

const signinUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const targetUser = await db.User.findOne({ where: { email: email } });
  if (!targetUser) {
    res.status(401).send({ message: "Invalid Email or Password" });
  } else {
    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      targetUser.password
    );
    if (isPasswordCorrect) {
      const payload = {
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        isAdmin: targetUser.isAdmin,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: 3600,
      });
      res.status(200).send({
        id: targetUser.id,
        name: targetUser.name,
        email: targetUser.email,
        isAdmin: targetUser.isAdmin,
        token: token,
      });
    } else {
      res.status(400).send({ message: "Email or Password is not found" });
    }
  }
});

const getUser = expressAsyncHandler(async (req, res) => {
  const user = await db.User.findOne({ where: { id: req.params.id } });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await db.User.findOne({ where: { id: req.user.id } });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = bcryptjs.genSaltSync(12);
      user.password = bcryptjs.hashSync(req.body.password, salt);
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 3600,
    });

    await db.User.update(
      { name: user.name, email: user.email, password: user.password },
      {
        where: {
          id: req.user.id,
        },
      }
    );

    const updatedUser = await db.User.findOne({ where: { id: req.user.id } });
    res.send({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
  }
});
module.exports = {
  registerUser,
  signinUser,
  getUser,
  updateUser,
};
