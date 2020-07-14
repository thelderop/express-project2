# express-project2

App description:

My app, called Hike Finder, queries the Hiking Project API to find trails and related info based on the user's inputted location. Users can save trails to their profile, and rank trails on a score from 1 to 5.

Technology:

It uses HTML (specfically embedded Javascript), Node.js, Javascript, and CSS.

MVP:

Successful queries to the Hiking Project API. Several models were used for the user, trails, trail rank, and relevant join tables. Basic styling achieved. Initially, I had a separate model for the trail rank, but decided to fold that into the join table connecting trails and users.

Stretch goals:

Forgot password option, better styling, include images of trails where available, random hiking background image on page load, multiple saved lists: trails tried, trails to try, etc., commenting functionality, sharing trails with other users.

Major bugs;

BetterDoctor API is down, and I spent some time trying to query it before realizing. Pivoted last-minute to the Hiking Project API.

Wireframes (out of date- they are for BetterDoctor, not Hiking Project):

Routes:

 Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/profile` | profile page for specific user and associated trails |
| POST | `/profile/:id` | Add a trail to a user's profile |
| PUT | `/profile/:id` | Update a user's trail rank |
| DELETE | `/profile/:id` | Removes a trail from a user's profile |
| POST | `/trails/search-results` | Queries API and returns index of results |
| GET | `/trails/:id` | Opens a show page containing details about specific results |
| GET | `/trails` | Renders the search page for users to find results |
