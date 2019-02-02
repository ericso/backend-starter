# backend-starter

Backend starter using Nodejs and Sequelize.

## To run locally
1. Setup a Postgres database. You can find directions via this tutorial: https://www.robinwieruch.de/postgres-sql-macos-setup/.
2. Create a `.env` file in the root direction with the following keys:

* DATABASE=[name of database]
* DATABASE_USER=[database user]
* DATABASE_PASSWORD=[user password]
* SECRET=< some string you want to keep secret, used to sign jwt tokens >

3. Install deps `npm run install`
4. Run `npm run start`

## Usage
This nodejs app exposes the following endpoints:

* POST /auth/register
Headers: `Content-type: application/x-www-form-urlencoded`
Fields: `username` and `password`
Returns: JSON with `{ token: 'some-token' }`

The token return should be set on `x-access-token` in authenticated requests.
This creates a new user document in the database.

* POST /auth/login
Headers: `Content-type: application/x-www-form-urlencoded`
Fields: `username` and `password`
Returns: JSON with `{ token: 'some-token' }`

Like `/register`, the token returned is the jwt token used in authenticated requestes.
If a user is not found by the provided username or the password is not verified, an unauthorized response is returned.
