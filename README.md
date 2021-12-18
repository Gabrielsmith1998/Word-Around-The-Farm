# Word Around The Farm
<img width="1440" alt="Screen Shot 2021-12-18 at 11 13 20 AM" src="https://user-images.githubusercontent.com/86996271/146649870-e19ae373-7d93-4612-b77c-b832201d8689.png">


> The user of this application would be a baseball nerd trying to stay up to date with latest minor league prospects.

### [Deployed App](https://word-around-the-farm.netlify.app/)

## [WATF ERD](https://dbdiagram.io/d/61a3dd308c901501c0d623a5)
## [WATF WIREFRAME](https://docs.google.com/presentation/d/1DdvKKm1SAfQLc6G2ReMyjFjQ1G4Wwq_mQXn1Fi5pCk4/edit?usp=sharing)

# Word Around The Farm: Authentication and Routing
## User Stories - Authentication

* As a user, if I go to the application and I am not logged in, I should see the application with a google authentication button in the NavBar.
* As a user, I should be able to authenticate via google.
* As a user, I should always see a navbar.
* As a user, when I am logged in, the navbar should only display Home, My Watched Prospects, and Scout Talk.
* As a Admin user, when I am logged in, the navbar should still display Home, My Watched Prospects, and Scout Talk as well devPortal which allows me as admin to CRUD.
* As a user, when I click the logout button in the navbar I should be logged out and should see the login button in the NavBar.

## User Stories - Routing
* As a user if I click the home link in the navbar, I should navigate to '/home' which displays 3 things. The first is a countdown to opening day. The second and third are the top 10 prospects and top 10 farm systems.
* As a user if I click the My Watched Prospects link in the navbar, I should navigate to '/my-watched-prospects'  which will display all of the prospects I have watched.
* As a user if I click the Scout Talk link in the navbar, I should navigate to '/scout-talk'  which displays all of the uploaded posts.
* As a user if I click the Full Rankings link beside the top 10 farm systems, I should navigate to '/full-rankings'  which will display the entire rankings of every organizations farm system.
* As a user if I click the Top 5 Prospect link inside the full rankings view, I should navigate to '/top-5-prospects'  which will display the top five prospects for the selected organization.
* As a admin user if I click the Dev Portal link in the navbar, I should navigate to '/devPortal' which will bring up a view that allows me to crud on the prospects and teams.


# Word Around The Farm: CRUD on Prospects and Teams

## Admin User Stories CRUD
* As an Admin user, when I click devPortal in the navbar I will be shown 2 links. these links allow me to create prospects and teams.

### CREATE
* As an admin user, when I click on Create Prospect or Create Team, I should be navigated to either /createProspects or /createTeams which will display a form for creation based on the selected type.
<img width="1440" alt="Screen Shot 2021-12-18 at 11 14 07 AM" src="https://user-images.githubusercontent.com/86996271/146649884-0e6b2847-8010-4c70-8642-f46f3e3d70d1.png">

### READ
* As a user, when I navigate to the /home, /my-watched-prospects and /scout-talk route, I should see the data that pertains to those specific views.
* As a user, when I watch a prospect, I should be able to then navigate the My Watched Prospects view and see that prospect listed on the view.

### UPDATE
* As an Admin user, when I click on the Edit button on either the prospect card or team card, I should be redirected to either the editProspect page or editTeam page and should see a form pre-populated with all the information for the specific item I am editing.  Once I make edits and push the save button, Firebase should edit and I should be redirected to the '/home' page.
<img width="1440" alt="Screen Shot 2021-12-18 at 11 15 38 AM" src="https://user-images.githubusercontent.com/86996271/146649901-73e95b82-2ecc-4ff8-a529-223790680b49.png">

* As an Authenticated user, when I click on the Edit button on my scout talk posts, I should be redirected to either the editPost page and should see a form pre-populated with all the information for the specific post I am editing.  Once I make edits and push the save button, Firebase should edit and I should be redirected to the '/scout-talk' page.

### DELETE
* As an Admin user, when I click the Delete button on the prospect card, the prospect will get deleted from the firebase database and the page will update with the remaining prospects.

* As an Admin user, when I click the Delete button on the team card, the team will get deleted from the firebase database and the page will update with the remaining teams.

* As an Authenticatied user, when I click the Delete button on the scout post card, the post will get deleted from the firebase database and the page will update with the remaining posts.
