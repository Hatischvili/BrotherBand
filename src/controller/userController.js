const User = require("../models/UserSchema");
const moment = require("moment");

///////////////////////////////
//////////////GET//////////////
///////////////////////////////

////WELCOME////

const welcome = async (req, res) => {
  try {
    const user = req;
    res.status(200).json("Welcome to the BrotherBand protocol");
  } catch (error) {}
};

///GET USER'S OWN INFO///

const getMyInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const userInfo = {
      Name: user.username,
      Born: moment(user.birthdate).format("DD/MM/YYYY"),
      Age: moment.duration(moment().diff(moment(user.birthdate)))._data[
        "years"
      ],
      Secret: user.secret,
      Status: user.status,
      Favorites: user.favorites,
      Brothers: user.bothers,
      Registered: moment(user.registeredIn).format("DD/MM/YYYY"),
    };
    res.status(200).json({ userInfo });
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN ID///

const getMyId = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.id);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN STATUS///

const getMyStatus = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.status);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN FAVORITES///

const getMyFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.favorites);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN BROTHERS///

const getMyBrothers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const userBro = await User.findById(user.brothers);
    const userBroId = userBro.id;
    const userBroNames = userBro.username;
    res.status(200).json([{ Name: userBroNames, Id: userBroId }]);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN INBOX///

const getMyInbox = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.inbox);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN OUTBOX///

const getMyOutbox = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.outbox);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN RECIEVED BROTHERBAND REQUESTS///

const getMyRecievedBBRequests = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json(user.receivedBBRequests);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///GET USER'S OWN SENT BROTHERBAND REQUESTS///

const getMySentBBRequests = async (req, res) => {
  const user = await User.findById(req.userId);
  try {
    res.status(200).json(user.sentBBRequests);
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///////////////////////////////
/////////////PATCH/////////////
///////////////////////////////

///UPDATE USER'S OWN STATUS///

const patchMyUpdateStatus = async (req, res) => {
  const user = await User.findById(req.userId);
  try {
    const update = {
      status: req.body.status,
    };

    User.findOneAndUpdate(user, update, function (error, result) {
      if (error) {
        res.status(500);
      } else {
        res.status(202).json({ "Status updated": update });
      }
    });
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///////////////////////////////
/////////////DELETE/////////////
///////////////////////////////

///CUT BROTHERBAND///

const deleteCutBrotherband = async (req, res) => {
  const exBro = await User.findById(req.params.id);
  const exBroId = exBro.id;
  const user = await User.findById(req.userId);
  const userId = user.id;

  try {
    user.brothers.pull(exBroId);
    await user.save();

    exBro.brothers.pull(userId);
    await exBro.save();

    res
      .status(200)
      .json({ "You've sucessfully cut your brotherband with": exBro.username });
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

const deleteRecievedBBRequests = async (req, res) => {
  const user = await User.findById(req.userId);
  const sender = await User.findById(req.body.id);
  const userId = user.id;
  const senderId = sender.id;

  try {
    user.receivedBBRequests.pull(senderId);
    await user.save();

    sender.sentBBRequests.pull(userId);
    await sender.save();

    res.status(200).json("You've rejected the brotherband request");
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
};

///////////////////////////////
/////////////POST//////////////
///////////////////////////////

const postAcceptBB = async (req, res) => {
  const user = await User.findById(req.userId);
  const newBrother = await User.findById(req.params.id);
  const userId = user.id;
  const brotherId = newBrother.id;
  const secret = `${user.username}'secret is: ${user.secret}`.toString();

  if (user.receivedBBRequests.includes(brotherId)) {
    try {
      user.brothers.addToSet(brotherId);
      await user.save();

      newBrother.brothers.addToSet(userId);
      await newBrother.save();

      user.receivedBBRequests.pull(brotherId);
      await user.save();

      newBrother.sentBBRequests.pull(userId);
      await newBrother.save();

      newBrother.inbox.addToSet(secret);
      await newBrother.save();

      res
        .status(201)
        .json(`${newBrother.username}'secret is "${newBrother.secret}"`);
    } catch (ERR) {
      res.status(500).json({ Message: ERR.message });
    }
  }
};

module.exports = {
  getMyInfo,
  getMyId,
  getMyBrothers,
  getMyStatus,
  getMyFavorites,
  getMyInbox,
  getMyOutbox,
  getMyRecievedBBRequests,
  getMySentBBRequests,
  patchMyUpdateStatus,
  deleteCutBrotherband,
  postAcceptBB,
  deleteRecievedBBRequests,
  welcome,
};
