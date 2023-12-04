# Project Title

Prospecta

## Overview

Prospecta is a simple to use and easy to visualize sales pipeline navigator capable of helping users track sales expectations over time. Avoiding the cumbersome nature of other sales pipeline trackers, Prospecta will deliver clean visuals and data viewing options with minimal input requirements from sales professionals.

## How to Start

#### If visiting the live site

- Visit the following link: https://prospecta.netlify.app/;
- Please note that the server may take several seconds to make the signup or login request at startup. After this time, requests will be immediate.
- Signup with a username or password, then sign in!

#### If Starting from github

1. Download the main branch from both the client and backend repositories. Links are below.

- https://github.com/tmaxwell-96/prospecta-client
- https://github.com/tmaxwell-96/prospecta-backend

2. Run NPM I on both folders to download node modules.

3. Add a .env file to both the front and back end following the example.env files in each folder.

4. Set up mySQL database and input DB details into backedn .env file

5. run npx knex migrate:latest and npx knex seed:run to populate the DB with placeholder data if you choose. By default, the users table will not have any users.

6. Use npm start to start front end, and node index.js to start the backend.

7. Sign up as a user and sign in!

### Problem

In my past roles I've had experience with two low-end CRM softwares with bugs, unclear displays, and difficult UIs. The result is that members of our sales team would often avoid inputting deals or prospects, as the time spent didn't seem worth the benefit. However, when reports were due, our team would then need to sort through extended periods of time for useful information. A tool that can easily take deal information with as few input fields as possible would aleviate this problem, and I believe this issue is felt by sales teams across a multitude of industries.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

The base features of the app I expect to implement are:

- A secure login
- Ability to view all deals in one list.
- Ability to sort this list by relevent fields (date created, projected date, value, position in the pipeline, etc.)
- Ability to see a list of deals over varying periods, past or present. Should be dynamic, allowing users to choose things like coming month, coming six months, coming year, or a selected amount of time.
- Graphical representation of the above mentioned lists to allow users to visually understand sales projections and performance.
- Individual pages for company information where users can view and input information like address, contact information, and contacts.
- All above will be created in a full-stack application. I will allow CRUD operations on the data. This means adding, editing, and deleting deals and companies.

Further desired features will be added after this functionality and visual style is solid. Ideas are listed in the nice-to-have section.

## Implementation

### Tech Stack

- React for client side, using HTML5, CSS3, and SCSS for layout and styling.
- Node.js and express to create the backend routes and control.
- MySQL to store data.
- I intend to use react-modal and charts.js libraries at a minimum for functionality and appearance.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Pages will be displayed dynamically using react. If all requirements below prove to be too much I will remove the contacts page.

- Main page: displays users name and potentially highlights (top deals in the last month, top upcoming deals, top companies, etc.) Will have navigation to the deals, companies, or contacts pages in a nav bar or a side bar.
- Deals page: Will default to a list of all deals across all companies. Columns will have sort features. Can click deal item to get further details. Can click on company to view company details. Will be a date selection function and a graphical representation button.
- Companies page: similar to deals page, will list all companies, total value of deals associated. Can click on them to get further details. Can sort.
- Graphical representation: Using chart.js, users will be able to view a chart based on selections on the deals page. May show a small graphical representation above the deals list as well.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

- GET for all deals
- GET for deals by company name
- GET for dealy by date range
- GET for all companies

- POST for new deal
- POST for new company

- PUT for new deal
- PUT for new company

- DELETE for new deal
- DELETE for new company
- DELETE for new contact

### Auth

Auth is performed using JWT tokens saved in session storage.

## Nice-to-haves

Further features to add:

- Ability to search within pages for desired information like company, date, contact, etc.
- TODO calendar showing deals by date.
- Reminder function with automatic email?
- Multiple logins and ability to assign companies to different users.
- Minimal CRM features, ability to add notes, phone calls, and other details to companies and deals.
- Contacts page, table, and crud operations
