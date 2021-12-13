const bcrypt = require("bcrypt");

exports.hashPass = async (password, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};
