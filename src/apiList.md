#Devtinder apis

#I will create different router to handle different routes and this is done by express router for example

##authRouter

- POST /signup
- POST /login
- POST /logout

##profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

##connectionRequestRouter

- POST /request/send/:status/:userId
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/:status/:requestId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

##userRouter

- GET /user/requests/received
- GET /user/allConnections
- GET /user/feed - Gets you the profile of the other users on platforms
