# Chess Game

## Tech Stack

This project uses the following technologies:

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB, Socket.io
- **Other Tools**: Axios, JWT, Mongoose

## Features

- Real-time multiplayer chess game
- User authentication and session management
- Real-time chat between players
- Game state synchronization using Socket.io
- Responsive design with TailwindCSS

## Backend Endpoints

### User Endpoints

#### Login and User Mapping
- **URL**: `/user/login/:username`
- **Method**: `GET`
- **Description**: Logs in a user and maps them to an opponent if available.
- **Response**:
  ```json
  {
    "statusCode": 200,
    "data": {
      "user": {
        "_id": "user_id",
        "username": "username",
        "opponent": "opponent_id",
        "turn": "turn_id",
        "color": "color",
        "board": "board_state"
      },
      "accessToken": "access_token",
      "refreshToken": "refresh_token"
    },
    "message": "User logged In Successfully",
    "success": true
  }
  ```

**Get Current User**
- **URL:** `/user/get_current_user`
- **Method:** `GET`
- **Description:** `Fetches the current logged-in user.`
- **Response 200** 
    ```json
    {
    "statusCode": 200,
    "data": {
        "_id": "user_id",
        "username": "username",
        "opponent": "opponent_id",
        "turn": "turn_id",
        "color": "color",
        "board": "board_state"
    },
    "message": "current user fetched successfully",
    "success": true
    }
    ```


**Logout User**
- **URL:** `/user/logout`
- **Method:** `GET`
- **Description:** `Logs out the current user.`
- **Response 200** 
    ```json
    {
        "statusCode": 200,
        "data": {},
        "message": "User logged Out",
        "success": true
    }
    ```

**Update Turn**
- **URL:** `/user/update_turn`
- **Method:** `POST`
- **Description:** `Updates the turn for the current game.`
- **Response 201** 
    ```json
    {
        "statusCode": 201,
        "message": "Turn updated",
        "success": true
    }
    ```

**Game Over**
- **URL:** `/user/game_over`
- **Method:** `POST`
- **Description:** `Sends a game over message to the opponent.`
- **Response 201** 
    ```json
    {
      "statusCode": 201,
      "data": {
        "message": {
          "losser_message": "Game Over!, winner won the game!!. He Kill's your King!!",
          "winner_message": "Game Over!, You won the game!!."
        }
      },
      "message": "message sent to opponete",
      "success": true
    }
    ```

**Save Message**
- **URL:** `/user/save_message`
- **Method:** `POST`
- **Description:** `Saves a message in the conversation.`
- **Response 200**
    ```json
    {
      "statusCode": 200,
      "data": {
        "conversation": {
          "_id": "conversation_id",
          "sender": "sender_id",
          "receiver": "receiver_id",
          "messageIds": ["message_id"]
        }
      },
      "message": "Message saved saved successfully!!",
      "success": true
    }
    ```

**Get All Messages**
- **URL:** `/user/get_all_messages`
- **Method:** `GET`
- **Description:** `Fetches all messages in the conversation.`
- **Response 200**
    ```json
    {
      "statusCode": 200,
      "data": {
        "all_message": [
          {
            "_id": "message_id",
            "message": "message_text",
            "sender": "sender_id"
          }
        ]
      },
      "message": "Conversation got Successfully!!",
      "success": true
    }
    ```
