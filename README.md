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
    
    
### Reservation object

_id: reservation ID

resourceId: what court / resource have been reserved

reservedBy: ( -> user._id) who makes this reservation (for regular user  - only own reservations have this field, for stuff members - all)

type: (10=public, 20=private unconfirmed, 30=private confirmed) type of reservation (enum)

title: title for public events (like some competitions)

start, end: start of reservation, end of reservation. Server will see if this time will match working schedule for this day

For FullCalendar events also this field are filled:
editable: only for own events
overlap: false
constraint: server-based working schedule for this day



    



(с) 2016, deksden, Not for commercial use.