# Project Title

Prospecta (Work in progress)

## Overview

What is your app? Brief description in a couple of sentences.

Prospecta is a simple to use and easy to visualize sales pipeline navigator capable of helping users track sales expectations over time. Avoiding the cumbersome nature of other sales pipeline trackers, Prospecta will deliver clean visuals and data viewing options with minimal input requirements from sales professionals.

### Problem

In my past roles I've had experience with two low-end CRM softwares with bugs, unclear displays, and difficult UIs. The result is that members of our sales team would often avoid inputting deals or prospects, as the time spent didn't seem worth the benefit. However, when reports were due, our team would then need to sort through extended periods of time for useful information. A tool that can easily take deal information with as few input fields as possible would aleviate this problem, and I believe this issue is felt by sales teams across a multitude of industries.

### User Profile

Who will use your app? How will they use it? Any special considerations that your app must take into account.

My app will be geared towards both sales professionals or small businesses without a sales team, helping both track projected incoming sales and analyze past performance.

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

### APIs

List any external sources of data that will be used in your app.

I do not intend to use external APIs as the app is meant to function with user inputed data, unless I can find an API with the specific data points I need to demonstrate function. I intend to use chatGPT to get mockup data to populate the database initially.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

Pages will be displayed dynamically using react. If all requirements below prove to be too much I will remove the contacts page.

- Main page: displays users name and potentially highlights (top deals in the last month, top upcoming deals, top companies, etc.) Will have navigation to the deals, companies, or contacts pages in a nav bar or a side bar.
- Deals page: Will default to a list of all deals across all companies. Columns will have sort features. Can click deal item to get further details. Can click on company to view company details. Will be a date selection function and a graphical representation button.
- Companies page: similar to deals page, will list all companies, total value of deals associated. Can click on them to get further details. Can sort.
- Contacts page: Will list all contacts with contact information. Click to view more details, sort to sort by relevent fields.
- Graphical representation: Using chart.js, users will be able to view a chart based on selections on the deals page. May show a small graphical representation above the deals list as well.

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

![Mobile list view](assets/mockups/mobile-list.jpg)

![Mobile Single Item](assets/mockups/mobile-single-details.jpg)

![Mobile Graphical View](assets/mockups/mobile-graphical.jpg)

![Tablet View, all](assets/mockups/tablet.jpg)

![Desktop view, all](assets/mockups/desktop.jpg)

### Data

I anticipate having at least 2 tables, potentially 3. Below are their details.

Deals table with:

- ID
- Date added
- Date updated
- Date of expected transaction
- Value
- % certainty
- weighted value
- Company

Companys table with:

- Company name
- Company deal value
- Company next upcoming deal
- Address
- Main Contact
- Within the specific company page may have a list of other contacts as well

Contacts page with:

- Contact name
- Contact details
- Company
- Role

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

- GET for all deals
- GET for deals by company name
- GET for dealy by date range
- GET for all companies
- GET for all contacts
- GET for all contacts by company

- POST for new deal
- POST for new company
- POST for new contact

- PUT for new deal
- PUT for new company
- PUT for new contact

- DELETE for new deal
- DELETE for new company
- DELETE for new contact

### Auth

Does your project include any login or user profile functionality? If so, describe how authentication/authorization will be implemented.

Front end and back end Auth will be implemented similar to class, using JWT tokens.

## Roadmap

Scope your project as a sprint. Break down the tasks that will need to be completed and map out timeframes for implementation. Think about what you can reasonably complete before the due date. The more detail you provide, the easier it will be to build.

- Initialize both front end and back end repositories and structure. Create develop branches. 30 mins
- Create migration and seed files for DB with mock data. 1-2 hours.
- Create partials with button, field, color, font, and breakpoints
- Create back-end get requests for full lists of companies and deals. 1 hour.
- Create minimalist front end lists of both components. Style for both mobile and generic wide. 1-2 hours.
- Create post and put back end requests for deals and companies. 1-2 hours.
- Create minimalist front end forms to handle all. 2-4 hours.
- Create delete requests for deals and companies. Create front end modal to handle. 1-3 hours.
- Create specific get requests/queries (by company, by date). 1-3 hours.
- Create graphical representation page based on selected get requests. 3+ hours.
- Repeat the above front and back end get, post, put, and delete for contacts.
- Complete styling for all elements, making dynamic between breakpoints. 3+ hours

## Nice-to-haves

Your project will be marked based on what you committed to in the above document. Under nice-to-haves, you can list any additional features you may complete if you have extra time, or after finishing.

- Ability to search within pages for desired information like company, date, contact, etc.
- TODO calendar showing deals by date.
- Reminder function with automatic email?
- Multiple logins and ability to assign companies to different users.
- Minimal CRM features, ability to add notes, phone calls, and other details to companies and deals.
