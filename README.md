# Backend Gone Wild v1.1
## About
This backend was being developed for a web application that handles Erasmus application and enrolment process. However then turned into my personal project. There was a database implemented beforehand but I have disconnected and got creative with the usage of the memory and handling accounts. 
After the memory usage changed from a database to a shared local memory, then I wanted to change the implementation as it was a OOP developed application (I know that NodeJS is an OOP language. However I wanted it to be like the traditional OOP such as in Java or cpp).

## About (Technical)
* NodeJS 18.13.0 and TypeScript 4.9.4 is used in development. If we examine the db.ts file there was a PostgreSQL database connected beforehand but then disconnected.
* For security first jwt's were used but than they added some complications on the backend because the frontend had some problems however the routed endpoints with (j!) tag are to be secured by a jwt.
* TypeScript is used because it gives the impression of a statically typed language and feels more closer to the syntax of traditional OOP languages.

### Memory
* The data that should have been stored in db is now stored locally on secured shared variables. (NOTE: saving the state of these variables to be added. Simply can put them into JSON fromats and store it into a file or into a No SQL database (Mongo). Everyting is object oriented therefore implementing this behaviour is really easy.)

### Routing
* All the routing is done in "app.ts" file and the To Be Added endpoints are also in there however not yet implemented.
