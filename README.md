# Descriptions 
This application is a 'gamified', social media algorithm app. In this app, users can upload 1 piece of media (any static image such as .jpeg .png) per day (calendar day in the server's timezone). Other users in this application can then rate these uploaded pieces of media on a scale of 1-10. After a requisite number of ratings (50 ratings for production and 10 for testing) from anonymous users, an uploaded piece of media is moved from the 'Rating Stage' to the  'Automated Matching Stage' - where the magic happens. In this stage, uploaded pieces of media receive 1 token initially. Additionally, uploaded pieces of media from different users are then compared using their average ratings from the previous 'Rating Stage.' When two pieces of media are matched up with one another, the media with the higher rating-average claims 1 token from the media with the lower rating-average. If a piece of media ends up with zero tokens, it is then kicked out of the 'Automated Matching Stage' and the original uploader essentially loses 1 token. As long as a piece of media has at least 1 token, it will keep getting matched with other pieces of media until it hits a token count of zero, or it reaches its max amount of matchups allowed. A piece of media finishes the 'Automated Matching Stage' by either losing all of its tokens or hitting the match limit (4500 for production, 10 for prototyping/testing). The amount of tokens accumulated through this process will then be added into the user's 'tokens won' balance.

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
7. Create a `.env file `at the root of the project and paste this line into the file: **Look into your handout for the password**
8. Create a database named`plus_app`in PostgresSQL If you would like to name your database something else, you will need to change `plus_app` to the name of your new database name in `server/modules/pool.js`
9. The queries in the `database.sql` file are set up to create all the necessary tables that you need, as well as some test data to test the app. Copy and paste those queries in the SQL query of the database. 
10. Run `npm run server` in your VS Code terminal or open a second terminal with shortcut `CTRL + T`
11. Open a second terminal or third terminal and run `npm run client`
12. React still Navigate to `localhost:3000`

# Usage

**Once everything is installed and running it should open in your default browser - if not, navigate to`http://localhost:3000/#/.`**

Video walkthrough of application usage: ` Future Link to Video`

# Deployment

1. Login Credentials for Heroku have been provided in the `hand off document`.

2. If you need make changes you wish to push to the deployed app, you must login, go into the pet-star section, go to the deploy tab, and then manually deploy. 
   You can reconfigure this to redeploy automatically if you wish, which is on the same page.

3. Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button
