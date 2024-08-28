# Contact Management API using Express js
## CRUD OPERATIONS
### Contact 
1. Create Contact (by ID)
2. Update Contact (by ID)
3. Delete Contact (by Id)
5. Get Contact (by ID)
4. Get All Contacts (where the user has created multiple contacts)

### User
1. Login
2. Register
3. Current (get the currently logged-in user info)

## Steps involved
1. Install node js
2. Install Express js
3. install nodemon
   - for monitoring the changes happening in the backend and reflecting immediately on the server.
  
4. Get Mongo DB connection URL for storing data in the backend
   - Create a user in the Mongo DB.
   - create a cluster
   - Install Mongo db extension in the vs code
   - install mongoose for connecting the backend APIs with db
   - connect the DB with the backend by getting the connection URL
   - Create schema for the APIS data
  
5. Files or Folders and their contents
   - server.js
     - main server where our backend will run
   - constants.js
     - contains the http response number, which has an alibi to understand numbers easily.
     - used in error handling
    
   - .env
     - contains all the sensitive information that can be used directly in the files 
    
   - config folder
     - logic for connecting Mongo db with the backend using Mongoose
    
   - controller folder
     - contains the logic of the APIs
    
   - middleware
     - contains the logic for validating the token ( we will explain later )
     - contains the logic for error handling when the desired response is not fetched
    
   - models
     - contain schema for the user and contacts
    
   - routes
     - contains the logic for the routing, it's easier to handle the routing separately
    
6. Testing the APIs
   - install thunder client extension in the VS code to test the calling of the APIs
  
7. Security features
   - Install a JSON web token to create a token when the user is logged in.
   - it doesn't allow other users to change the data
  
8. Install Asynchandler for checking the try-and catch error so that we don't need to write it  
    

    
