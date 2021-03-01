 Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

## Creating Board, playable X's and O's and winner result
1. I used state to create array which represents each boxes.
2. I named the user as 0 for 'X' and 1 for 'O'.
3. I dulpicated the board array, which I named array. It stores the values of X and O in it.
4. If the user 0 clicks the button, array takes in 'X' and if it's user 1 it takes in 'O'.
5. I emit them in build with array values. By assigning the onclick value to function name is returns the value in 'X' and 'O'.
6. I followed similar steps in useEffect in order to make it for realtime use(for more than 1 individual).
7. For the winner declaration, I stored the winning sequences in an array which passes through a for loop and determines if the user wins or not.

## Resetting the Board
1. I created function called handleReset wich contains an emplty array resetBoard.
2. I emit that to reset in sockets.
3. Then used useEffect to rest the data in every single board open.
 
## Known Problems encountered
1. Previous users stays on the app until you restart the server.
2. I couldn't display the username of the winner, glad it's not applicable. 
3. Spectators are allowed to reset the Board.
4. User is able to click X and O on the same board.

## Technical Issues and Solution
1. I had problem where names were overlapping on board (same name 4-5 times).
-> To fix that I used map statement from one of the lectures. 
2. Couldn't figure out how to win function.
-> I googled and saw an example on www.freecodecamp.org.
3. The 'X' and 'O' buttons were clickable after they were assigned and after the user won.
-> Used an if statement which lets user click the button only when certain conditions are met.
