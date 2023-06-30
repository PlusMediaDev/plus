# Descriptions
This application is a 'gamified', social media algorithm app. In this app, users can upload 1 piece of media (any static image such as .jpeg .png) per day (calendar day in the server's timezone). Other users in this application can then rate these uploaded pieces of media on a scale of 1-10. After a requisite number of ratings (50 ratings for production and 10 for testing) from anonymous users, an uploaded piece of media is moved from the 'Rating Stage' to the  'Automated Matching Stage' - where the magic happens. In this stage, uploaded pieces of media receive 1 token initially. Additionally, uploaded pieces of media from different users are then compared using their average ratings from the previous 'Rating Stage.' When two pieces of media are matched up with one another, the media with the higher rating-average claims 1 token from the media with the lower rating-average. If a piece of media ends up with zero tokens, it is then kicked out of the 'Automated Matching Stage' and the original uploader essentially loses 1 token. As long as a piece of media has at least 1 token, it will keep getting matched with other pieces of media until it hits a token count of zero, or it reaches its max amount of matchups allowed. A piece of media finishes the 'Automated Matching Stage' by either losing all of its tokens or hitting the match limit (4500 for production, 10 for prototyping/testing). The amount of tokens accumulated through this process will then be added into the user's 'tokens won' balance.

**Currently deployed [here](https://plus-app-f1a61fe6dbd4.herokuapp.com/)**

# Built With

HTML
CSS
Javascript
PostgresSQL
React
Node.js
AWS

# Getting Started

Our IDE was VS code but should work will all IDE's.
- [IDE](https://code.visualstudio.com/)


# Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)

# Installation

1. Fork the repository
2. Copy the `SSH key` in your new repository
3. In your terminal type... `git clone {paste SSH link}`
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code run `npm install` to install all dependencies
7. Create a `.env` file at the root of the project based off the the existing
   `.env-example`. **The handoff document should contain all the information needed for this.**
8. Create a database named `plus_app` in PostgresSQL If you would like to name your database something else, you will need to change `plus_app` to the name of your new database name in `server/modules/pool.js`
9. The queries in the `database.sql` file are set up to create all the
   necessary tables that you need, as well as some test data
   (which requires you to create at least one user). Copy and paste those
   queries in the SQL query of the database.
10. Run `npm run server` in your VS Code terminal or open a second terminal with shortcut `CTRL + T`
11. Open a second terminal or third terminal and run `npm run client`
12. React will Navigate to `localhost:3000`

# Usage

**Once everything is installed and running it should open in your default browser - if not, navigate to `http://localhost:3000/`.**

Video walkthrough of application usage [here](https://youtu.be/_bvIbrzSco8)

# Deployment

1. This app, as well as its API's database, are deployed on Heroku. You can
   log in [here](https://www.heroku.com/).
2. If you need make changes you wish to push to the deployed app, you will need
   to use the Heroku CLI or connect the app to GitHub. Instructions for using
   the CLI, as well the the GitHub integration option, are availble in the
   `Deploy` tab in the Heroku app.
3. Environment variables are kept on Heroku in the `Settings` tab, just click the
   `Reveal Config Vars` button.
4. The connected database can be managed in the `Resources` tab.
   1. Click on the listed `Heroku Postgres` add-on link, which will open in
      a new tab.
   2. The `Settings` tab in that page will have the credentials needed to
      connect to the deployed database, if you need to make any changes.
   3. Documentation for connecting to the deployed database exists
      [here](https://devcenter.heroku.com/articles/connecting-heroku-postgres),
      or you can connect using Postico for a graphical interface.
