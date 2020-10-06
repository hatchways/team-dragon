# CLUEWORDS <img src="https://www.pikpng.com/pngl/m/5-50331_games-icon-circle-png-png-download-video-game.png" width="50">

ClueWords is a board game for 4-8 players. Two teams compete by having a spymaster give one word clue that can point to multiple words on the board. The other players on the team attempt to guess their team’s words while avoiding the words of the other team.
This application is built using Node.js, Express.js, React.js, Socket.io, MongoDB and AWS. 

## Contributors <img src="https://cdn0.iconfinder.com/data/icons/occupation-002/64/programmer-programming-occupation-avatar-512.png" width="40">
- [Bonnie Li](https://github.com/bonnieli) (Project Lead)
- [Karl Secen](https://github.com/karlkristopher)
- [Nicholas Chumney](https://github.com/chumnend)
- [Jorawar Singh](https://github.com/jorawarSinghNijjar)

## Installation <img src="https://img.icons8.com/color/452/npm.png" width="40">

1. Clone the repository
2. **Dependencies** - Run `npm install` in both client and server directories.

## Configuration <img src="https://www.clipartmax.com/png/middle/339-3394813_setting-clipart-control-system-system-configuration-icon.png" width="40">

1. Create a file with filename `.env` in server directory OR copy the file `env.example` from server directory and rename it to `.env`. `env.example` already contains the required variables, you just need to configure them.
2. Configure the application environment using `NODE_ENV` and `PORT` :

```
# Misc
NODE_ENV=[production or test or dev]
PORT= [Enter port number here]

```
3. Configure the application secret key for authentication using `SECRET_KEY`:

```
SECRET_KEY= [Enter secret key for passport.js here]
```

4. Create your account with Mongo Atlas (if you don't have an account) OR Use local instance of MongoDB
5. Configure the database URI using `DB_URI` :

```
# Database

DB_URI= [Enter your mongo URI here]

```
6. Download redis and add the `REDIS_URI`:

```
#Redis
REDIS_URI=[Enter your redis URI here]
```

7. Sign up for SendGrid and add the API Key you get from SendGrid to `SENDGRID_API_KEY`. Also add the domain to `DOMAIN` variable:
```
# SendGrid
SENDGRID_API_KEY=[Enter SendGrid API Key here]
# Domain (used in email invites)
# Note: do no include "/" at end of url (ie http://mywebsite.com))
DOMAIN= 
```
8.Sign up for AWS and configure AWS variables in `.env` file:
```
#AWS S3
AWS_ACCESS_KEY=[Enter AWS access key]
AWS_SECRET= [Enter AWS secret]
```

9. Finally, when all the `.env` variables are setup, run `npm start` for client and `npm run dev` for server to start. Enjoy the application!

## Demo

