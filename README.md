# API BASICS

This project provides an API for managing user data. You can perform various operations related to users, including listing users, retrieving user details, creating users, updating user information, and soft deleting users.

## Table of Contents

- Getting Started
  - Prerequisites
  - Installation
  - Configuration
- API Endpoints
- Payload for User
- Testing

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version X.X.X)
- MongoDB (optional, for database storage)

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

   

2. Install dependencies:

   ```bash
   npm install
   ```

   

### Configuration

1. Create a `.env` file in the root directory with the following environment variables:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost/mydb
   ```

   

2. Adjust the `MONGO_URI` to point to your MongoDB database.

## API Endpoints

### 1. List Users (GET)

- Endpoint: `/worko/user`

- Description: Get a list of all users.

- Example Response:

  ```json
  [
    {
      "_id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "age": 30,
      "city": "New York",
      "zipCode": "10001"
    },
    // Other users...
  ]
  ```

### 2. Get User Details (GET)

- Endpoint: `/worko/user/:userId`

- Description: Get details of a specific user by ID.

- Example Response:

  ```json
  {
    "_id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "age": 30,
    "city": "New York",
    "zipCode": "10001"
  }
  ```

### 3. Create User (POST)

- Endpoint: `/worko/user`

- Description: Create a new user.

- Example Request Body:

  ```json
  {
    "email": "jane@example.com",
    "name": "Jane Smith",
    "age": 25,
    "city": "Los Angeles",
    "zipCode": "90001"
  }
  ```

### 4. Update User (PUT/PATCH)

- Endpoint: `/worko/user/:userId`

- Description: Update user information (full update with PUT or partial update with PATCH).

- Example Request Body (PUT):

  ```json
  {
    "name": "Jane Johnson",
    "age": 26
  }
  ```

- Example Request Body (PATCH):

  ```json
  {
    "age": 27
  }
  ```

### 5. Soft Delete User (DELETE)

- Endpoint: `/worko/user/:userId`
- Description: Soft delete a user (mark as inactive).

## Payload for User

- Id (Generated)
- Email
- Name
- Age
- City
- Zip code