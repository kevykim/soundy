# About Soundy

Soundy is a soundcloud cloud web applicaiton that allows users to listen music, upload songs, and be able to leave comments on their favorite track. 

<img align='center' src="./frontend/src/public/assets/Soundy.png" />

### Backend: Express, Sequelize, Postgres
### Frontend: React, Redux, TailWind
### Deployment: Render
### Build: Vite

# Run Locally

1. Clone this repository
2. `cd` into the cloned file.
3. `npm install` to install dependencies in both frontend and backend directory.
4. Create a `.env` file using the `.env.example` as a guide.
    ```
    PORT=
    DB_FILE=db/dev.db
    JWT_SECRET=
    JWT_EXPIRES_IN=
    ```
5. Move to backend directory.
6. Run `npx dotenv sequelize db:migrate` 
7. Run `npx dotenv sequelize db:seed:all`
8. With two terminals, Run `npm start` in both frontend and backend directory to start the application.
