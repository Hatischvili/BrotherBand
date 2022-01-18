const User = require("../models/UserSchema");
const mongoose = require("mongoose");
const { hashPass } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

////////////////////////////////////REGISTER/////////////////////////////////////

const postSignUp = async (req, res) => {
  const { username, password, birthdate, secret, status, favorites } = req.body;

  const passHashed = await hashPass(password, res);

  try {
    const newProfile = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      password: passHashed,
      birthdate,
      secret,
      status,
      favorites,
    });

    const profileStored = await newProfile.save();
    await User.syncIndexes();

    res.status(201).json({ profile: profileStored });
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///////////////////////////////////////LOGIN//////////////////////////////////////

const postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(422).send({ message: "Usuário não encontrado!" });
    }

    const checkPassword = await bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res.status(422).send({ message: "Senha incorreta!" });
    }

    const secret = process.env.SECRET;

    const token = jwt.sign({ id: user.id }, secret);

    res.status(200).json({
      message: "Token utilizado com sucesso.",
      token,
    });
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

module.exports = {
  postSignUp,
  postLogin,
};
