# API Lists:

## authRouters:
-Post /signup
-Post /login
-Post /logout

## profileRouters:
-Get /profile/view
-Patch /profile/edit
-Patch /profile/password

## connectionRequestRouter
-post /request/send/:status/:userId
-post /request/review/accepted/:requestId
-post /request/review/rejected/:requestId

## userRouter
-Get /user/connections
-Get /user/requests
-Get /user/feed --> To get the other users profile


##
