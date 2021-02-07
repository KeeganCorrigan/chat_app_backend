# Guild Chat BE

This is the back end component of the Guild Chat app. You can find it live at https://keegan-guild-chat-be.herokuapp.com/. You can view the front end repo [here](https://github.com/KeeganCorrigan/chat_app_frontend), and you can find the frontend deployed live at https://keegan-guild-chat-fe.herokuapp.com/ (please see the github repo for additional instructions!).

This chat app uses [socket IO](https://socket.io/) to enable `private` (I use private loosely since there is currently no authentication or authorization implemented) chat between two users.

## Technologies used

* [Express](http://expressjs.com/)
* [Knex](http://knexjs.org/)
* [Postgres](https://www.postgresql.org/)
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)

## Getting Started Locally

To start locally:

1. Clone the repo locally: `git clone https://github.com/KeeganCorrigan/chat_app_backend.git`
2. Navigate to the root directory of the project
3. run `npm install`
4. run `knex migrate:latest` to run migrations.
5. run `knex seed:run` to seed the db.
6. run `npm start`

In conjunction you will probably want to run the front end locally, please visit [here](https://github.com/KeeganCorrigan/chat_app_frontend) for additional details!

If you do not have postgres installed, I recommend starting with the installation tutorial documentation: https://www.postgresql.org/docs/9.3/tutorial-install.html

## Testing

You can run the testing suite with `npm test`. The test will seed/migrate local db.

## End Points

### Login End Points

1. `POST /api/v1/login`

Finds or create user with the following parameters:

```
{ "userName": "Zeus" }
```

If user is successfully created, the user model will be returned with status 201. If the user already exists, user model will be returned with status 200.

### Message End Points

2. `GET /api/v1/messages`

Returns the last 100 messages associated with the private chat room name. Messages are returned in the following format:

```
{
  "id": 1,
  "text": "I'm a really important message",
  "sender_name": "Apollo"
}
```

The `roomName`param is required to return meaningful data. A `limit` param is optional to return the desired number of messages.

**SPECIAL NOTE**: This endpoint requires more attention to be robust, but the current implementation is meant to accomodate the MVP.

3. `POST /api/v1/messages`

Creates a new message with the parameters:

```
{ 
  "text": "An equally important reply",
  "sender_id": 2,
  "receiver_id": 1,
  "room_name": "ApolloZeus"
}
```

If message is successfully created, the message will be returned. Additional error handling is necessary to make this route more robust.

## Additional TODOs:

* Add authorization/authentication.
* Add additional testing beyond the `login`route.
* Additional error handling.
* Refine initial models (currently the user is just a `UserName`)
* Additional CRUD functionality (removing messages, deleting/updating users, deleting conversations, etc.,).
* ... and so much more!
