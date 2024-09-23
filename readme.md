# Vayu Backend

This document provides the setup instructions for the Vayu backend project.

## Setup

1. **Clone the repository**: Clone the backend repository to your local machine.

2. **Install dependencies**: Run `yarn install` to install all the necessary dependencies.

3. **Environment Variables**: Replace all the `template.env` files with your `.env` file. There are currently 3 `.env` files:
    - One in the root directory
    - One in the `auth` project root directory
    - One in the `notifications` project root directory
    
4. **Configuration for template  emails: For the first time running the app, email templates aren't set so go to the  directory /app/auth/src/auth.controller.ts in the vscode, uncomment the UseGuards() in create api.

5. **Start the Docker containers**: From the root directory, run `docker compose up`. This will create a PostgreSQL image and run the containers.

6. **Create Email Templates: from localhost:8002/api, create new notifications in order:

        **Note** While creating the email templates below for the first time, make sure you create only one instance of each email and the word "temporary" inside "Your otp is temporary" in "message" is exactly that (its case sensitive). In Real-time, the templates email message's "temporary" field will be replaced by actual otp and link.**

        1. {"title":"OTP", "message": "Your otp is temporary","subject":"Otp Verification"}
        2. {"title":"Reset Password", "message": "Your password reset link is temporary", "subject" : "Password Verification"} 

6. Then close the container uncomment the UseGuards() back and rerun the container. (This is needed only for the first time then no nee to comment it again)
## API Documentation

- Visit `localhost:8000/api` for the Auth API documentation.
- Visit `localhost:8002/api` for the Notifications API documentation.

## Ports

- Ports 8001 and 8003 are allocated for TCP connections.

## API Usage

### GetMany Requests

- **Ordering**: `localhost:8000/api/users?order[id]=DESC` or `localhost:8000/api/users?order[id]=ASC`
- **Range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12}]&order[id]=DESC`
- **Multiple range-based selection**: `localhost:8000/api/users?range=[{"property":"id","lower":11,"upper":12},{"property":"name","lower":"j","upper":"k"}]`
- **Pagination**: `localhost:8000/api/users?skip=1&take=1` (skip = number of items to skip, take = number of items to take after skip)
- **Where**: `localhost:8000/api/users?name=Amrit`


# Vayu Frontend

This document provides the setup instructions for the Vayu Frontend project.

## Setup

1. **Clone the repository**: Clone the backend repository to your local machine.

2. **Install dependencies**: Run `yarn install` to install all the necessary dependencies.

3. **Home Page || Landing Page** / route

4. **For user & admin Dashboard** for now just simply navigate to the /userdash and /admindash to see basic template