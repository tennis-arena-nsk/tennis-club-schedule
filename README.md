# tennis-club-schedule

Schedule web app for tennis club: node, express, mongo, hackaton-starter template for user system.

## Features

* user system:
  * social login: Facebook, Twitter, Google
  * link social accounts to local account
  * password forgot / reset
  * email transaction notifications
* no schedule yet :(
  
## API endpoints

### User system 

    GET  /user/login            (html)  login page
    POST /user/login                    login via email/ password or social login
    GET  /user/logout                   logout current user
    GET  /user/signup           (html)  register new user 
    POST /user/signup                   register new user
    GET  /user/account          (html)  user profile
    POST /user/account/profile          update user profile
    POST /user/account/password         update password
    POST /user/account/delete           delete user account (? DEL /user/account)
    GET  /user/account/unlink/:provider unlink social login
    GET  /user/reset/:token     (html)  reset password screen
    POST /user/reset/:token             reset password
    GET  /user/forgot           (html)  forgot password screen
    POST /user/forgot                   reset password action
    
    GET /schedule              (public) get schedule
    GET /user/reservation               get reservations of current user
    PUT /user/reservation
    
### Use case

User open site, make authentication. 
>    System displays site in auth state.
    
Then he go to schedule and select availiable timeslot.
>    System displays schedule with timeslots and user's reservations. For logged-in users system displays utton to cancel reservation.
    
User makes reservation
>    System adds reservation to list of user's current reservations. System emails list of current reservations to stuff manager.
    
    
    
    



(с) 2016, deksden, Not for commercial use.