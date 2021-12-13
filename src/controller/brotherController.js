const User = require("../models/UserSchema");
const moment = require("moment");
const mongoose = require("mongoose");


///////////////////////////////
//////////////GET//////////////
///////////////////////////////


///GET USER INFO. IF STRANGER, ONLY NAME, AND REGISTERED IN. IF BROTHERS, LOADS OF DATA.///

const getBrotherInfo = async (req, res) => {
  const userCaught = await User.findById(req.params.id);
    const userGetter = await User.findById(req.userId);
    const caughtId = userCaught.id
    try {
      if (userGetter.brothers.includes(caughtId)) {
        const brotherInfo = {
          Name: userCaught.username,
          Id: caughtId,
          Born: moment(userCaught.birthdate).format("DD/MM/YYYY"),
          Age: moment.duration(moment().diff(moment(userCaught.birthdate)))._data["years"],
          Secret: userCaught.secret,
          Status: userCaught.status,
          Favorites: userCaught.favorites,
          Brothers: userCaught.bothers,
          Registered: moment(userCaught.registeredIn).format("DD/MM/YYYY"),
          };
          res.status(200).json({brotherInfo})
      } else {
          const strangerInfo = {
            Name: userCaught.username,
            Registered: moment(userCaught.registeredIn).format("DD/MM/YYYY"),
          };
          res.status(200).json({strangerInfo})
      }
    } catch (ERR) {
        res.status(500).json({ Message: ERR.message });

    }

    
}


///////////////////////////////
//////////////POST/////////////
///////////////////////////////

///SEND BROTHERBAND REQUEST. SAVES THE REQUEST ON SENDER'S SENT BROTHERBAND REQUESTS AND ON THE RECIPIENT'S RECIEVED BROTHERBAND REQUESTS///


const postSendBBRequest = async (req, res) => { 

 const userRecipient = await User.findById(req.params.id)
   const recipientId = userRecipient.id;
  const userSender = await User.findById(req.userId);
  const senderId = userSender.id;
  
    if (userRecipient.receivedBBRequests.includes(senderId)) {
      res.status(406).json("You've already sent a request");
    } 
      
     if (userRecipient.brothers.includes(senderId) || userSender.brothers.includes(recipientId)) {
    res.status(406).json("You both are already brothers")
     }
     if (senderId == recipientId) {
    res.status(406).json("You cannot have yourself as a brother")
}

try {
  userSender.sentBBRequests.addToSet(senderId);
        await userSender.save();
            
        userRecipient.receivedBBRequests.addToSet(senderId);
        await userRecipient.save();

        res.status(201).json("Brotheband request sent sucessfully")
  
}  catch (ERR) {
  res.status(500).json({ Message: ERR.message });
}}
 


const postSendMessage = async (req, res) => {
  const userSender = await User.findById(req.userId);
  const userRecipient = await User.findById(req.params.id);
  const recipientId = userRecipient.id
  const { message } = req.body;
  try {
    if (userSender.brothers.includes(recipientId)) {
      userSender.outbox.addToSet(`${message} from ${userSender.username}`);
      await userSender.save();

      userRecipient.inbox.addToSet(`${message} from ${userSender.username}`);
      await userRecipient.save()
      res.status(201).json("Message sent");
    } else {
      res.status(406).json("You cannot send messages to users whom are not your brothers");
    }
  } catch (ERR) {
    res.status(500).json({ Message: ERR.message });
  }
}


module.exports = {
  getBrotherInfo,
  postSendBBRequest,
  postSendMessage

}
