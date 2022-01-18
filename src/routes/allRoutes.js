const express = require("express");
const router = express.Router();

const middleware = require("../middlewares/authMiddleware");
const auth = require("../controller/authController");
const user = require("../controller/userController");
const brother = require("../controller/brotherController");

//////////////////////////////
/////////////AUTH/////////////
//////////////////////////////

router.post("/signup", auth.postSignUp);

router.post("/login", auth.postLogin);

router.use(middleware);

//////////////////////////////
////////MY PROFILE///////////
/////////////////////////////

/////////////////////////////////GET//////////////////////////////////////////

router.get("/me", user.getMyInfo);

router.get("/me/id", user.getMyId);

router.get("/me/status", user.getMyStatus);

router.get("/me/favorites", user.getMyFavorites);

router.get("/me/messages/inbox", user.getMyInbox);

router.get("/me/messages/outbox", user.getMyOutbox);

router.get("/me/brothers", user.getMyBrothers);

router.get("/me/brothers/requests/recieved", user.getMyRecievedBBRequests);

router.get("/me/brothers/requests/sent", user.getMySentBBRequests);

////////////////////////////////POST/////////////////////////////////////////

router.post("/me/brothers/requests/accept/:id", user.postAcceptBB);

//////////////////////////////PATCH///////////////////////////////////////////

router.patch("/me/status/update", user.patchMyUpdateStatus);

//////////////////////////////DELETE//////////////////////////////////////////

router.delete("/me/brothers/requests/deny", user.deleteRecievedBBRequests);

router.delete("/me/brothers/cut/:id", user.deleteCutBrotherband);

//////////////////////////////
////////OTHER USERS///////////
/////////////////////////////

/////////////////////////////////GET//////////////////////////////////////////

router.get("/:id", brother.getBrotherInfo);

////////////////////////////////POST/////////////////////////////////////////

router.post("/add/:id", brother.postSendBBRequest);

router.post("/brother/message/:id", brother.postSendMessage);

module.exports = router;
