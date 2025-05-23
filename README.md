**SETUP** <br>
Please complete the following steps before watching the [Loom Video](https://www.loom.com/share/f54df29de818445b9e84dcdc3079f028):
- Clone this repository
  - ```git clone https://github.com/bbrockbrown/ws7-activity1.git```
- cd into both the frontend and backend folders on two separate terminals and do:
  - Both folders: ```npm install```
- Create .env files for both the frontend and backend folders. Put in the following, respectively:
  - Frontend .env:
    - ```VITE_BACKEND_URL=yourbackendurl```, e.g. http://localhost:3005
  - Backend .env:
    - ```DATABASE_URL=yourrender.comdatabaseurl```, append ```?ssl=true``` to end of this URL
    - ```PORT=yourport```, must be same port as ```VITE_BACKEND_URL``` in frontend .env
- Start both the frontend and backend:
  - Frontend: ```npm run dev```
  - Backend: ```node server.js```
    
Done!
