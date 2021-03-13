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

## Database setup
1. Install PostGreSQL: `sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs` Enter yes to all prompts.
2. Initialize PSQL database: `sudo service postgresql initdb`
3. Start PSQL: `sudo service postgresql start`
4. Make a new superuser: `sudo -u postgres createuser --superuser $USER` **If you get an error saying "could not change directory", that's okay! It worked!**
5. Make a new database: `sudo -u postgres createdb $USER` **If you get an error saying "could not change directory", that's okay! It worked!**
6. Make sure your user shows up:
    - a) `psql`
    - b) `\du` look for ec2-user as a user (**take a screenshot**)
    - c) `\l` look for ec2-user as a database (**take a screenshot**)
7. Make a new user:
    - a) `psql` (if you already quit out of psql)
    - b) Type this with your username and password (DONT JUST COPY PASTE): `create user some_username_here superuser password 'some_unique_new_password_here';` e.g. `create user namanaman superuser password 'mysecretpassword123';`
    - c) \q to quit out of sql
8. Save your username and password in a `sql.env` file with the format `SQL_USER=` and `SQL_PASSWORD=`.
9. To use SQL in Python: `pip install psycopg2-binary`
10. `pip install Flask-SQLAlchemy==2.1`


## Database in server
1. Created socketio for passing the username and the score list.
2. Created an if statement where idon't pass the person if it's already in the database.
3. When the person is not in the database, it adds that person.
4. I used sqlalchemy to get result score in decending order. 
5. To add and remove points I added new on_result(data).
6. on_result(data) I'm sending the data to Board.js, which checks if the user is in the database and
    prints the data in frontend.
7. Then I'm using map function to print out the database and score.
 
## Known Problems encountered
1. When the board resets and user wins, That user is getting extra points.
2. Spectators are allowed to reset the Board.
3. User is able to click X and O on the same board.
4. When the second user does the first move and wins, It shows the first player as a winner. But the score changes for the right user.

## Technical Issues and Solution
1. I had problem where names weren't printing.
-> To fix that I used map statement from one of the lectures. 
2. Score list was printing as a string, I added the ['score'] as this and it worked for the list.
3. For the decending order
-> Used sqlalchemy before the score gets send to the script.
