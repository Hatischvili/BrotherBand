const express = require("express");
const router = express.Router();

const middleware = require("../middlewares/authMiddleware");
const auth = require("../controller/authController");
const user = require("../controller/userController");
const brother = require("../controller/brotherController")

router.get("/", user.welcome);



//////////////////////////////
/////////////AUTH/////////////
//////////////////////////////

router.post("/signup", auth.postSignUp);

/** 
*@api {post} /signup Registers user 
*@apiBody {string} [username]
*@apiBody {string} [password]
*@apiBody {string} [birthdate]
*@apiBody {string} [secret]
*@apiBody {string} [status]
*@apiBody {array} [favorites]
**/

router.post("/login", auth.postLogin);

/** 
*@api {post} /login Registers user 
*@apiBody {string} [username]
*@apiBody {string} [password]
**/

router.use(middleware);


//////////////////////////////
////////MY PROFILE///////////
/////////////////////////////

/////////////////////////////////GET//////////////////////////////////////////

router.get("/me", user.getMyInfo);

/** 
*@api {get} /me Fetches all user info except for password
@apiSuccess {string} [username]
@apiSuccess {string} [birthdate]
@apiSuccess {string} [secret]
@apiSuccess {string} [status]
@apiSuccess {array} [favorites]
@apiSucess {array} [brothers]
**/


router.get("/me/id", user.getMyId);

/** 
*@api {get} /me/id Fetches user id
@apiSuccess {Objectid} id unique to each user
**/

router.get("/me/status", user.getMyStatus);

/** 
*@api {get} /me/status Fetches user status
@apiSuccess {string} [status]
**/

router.get("/me/favorites", user.getMyFavorites);

/** 
*@api {get} /me/favorites Fetches user's favorites
@apiSuccess {array} [favorites]
**/

router.get("/me/messages/inbox", user.getMyInbox);

/** 
*@api {get} /me/messages/inbox Fetches user inbox
@apiSuccess {array} [inbox]
**/

router.get("/me/messages/outbox", user.getMyOutbox);

/** 
*@api {get} /me/messages/outbox Fetches user outbox
@apiSuccess {array} [outbox]
**/

router.get("/me/brothers", user.getMyBrothers);

/** 
*@api {get} /me/brothers Fetches user's Brothers 
@apiSuccess {array} [brothers]
**/
router.get("/me/brothers/requests/recieved", user.getMyRecievedBBRequests);

/** 
*@api {get} /me/brothers/requests/recieved Fetches user's Brotherband Requests
@apiSuccess {array} [recievedBrotherBandRequests]
**/

router.get("/me/brothers/requests/sent", user.getMySentBBRequests);

/** 
*@api {get} /me/brothers/requests/sent Fetches user's sent BrotherBand requests
@apiSuccess {array}[sentBrotherBandRequests]
**/

////////////////////////////////POST/////////////////////////////////////////

router.post("/me/brothers/requests/accept/:id", user.postAcceptBB);

/** 
*@api {post} /me/brothers/requests/accept/:id" accepts Brotherband requests, registeres a new user as brother, shows his secret and send him back a message
acceptant user's secret.
@apiParam {objectId}
**/

//////////////////////////////PATCH///////////////////////////////////////////

router.patch("/me/status/update", user.patchMyUpdateStatus);

/** 
*@api {patch} /me/status/update updates user status
@apiSuccess {string} [status]
**/

//////////////////////////////DELETE//////////////////////////////////////////


router.delete("/me/brothers/requests/deny", user.deleteRecievedBBRequests);

/** 
*@api {patch} /me/brothers/requests/deny denies and deletes a Brotherband requests by sending a request including the Brotherband request sender's ID
**/


router.delete("/me/brothers/cut/:id", user.deleteCutBrotherband)

/** 
*@api {patch} /me/brothers/cut/:id cuts and deletes a brotherband 
@apiParam {objectId}
**/


//////////////////////////////
////////OTHER USERS///////////
/////////////////////////////

/////////////////////////////////GET//////////////////////////////////////////

router.get("/:id", brother.getBrotherInfo)

/** 
*@api {get} /:id 
@apiParam {objectId}
****if users are not brothers****:
@apiSuccess {string} [username]
@apiSuccess {string} [registeredIn]
****if users are brothers***:
@apiSuccess {string} [username]
@apiSuccess {string} [birthdate]
@apiSuccess {string} [secret]
@apiSuccess {string} [status]
@apiSuccess {array} [favorites]
**/

////////////////////////////////POST/////////////////////////////////////////


router.post("/add/:id", brother.postSendBBRequest);
/** 
*@api {post} /add/:id sends BrotherBand requests
@apiParam {objectId}
**/

router.post("/brother/message/:id", brother.postSendMessage);

/** 
*@api {post} /add/:id sends message if the person is already your Brother
@apiParam {objectId}
**/


module.exports = router;
