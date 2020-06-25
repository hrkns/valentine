----------
**API:**
----------------
* Set the following environment variables:
  * **`WS_VALENTINE_FIREBASE_HOST`**: URL where the requests are going to be redirected to.
* Enter to `api` directory.
* Run `npm install`.
* Run the application with `npm run start-dev`.
* **API** will be listening in port **`3000`**.

----------
**Ionic App:**
----------------
* Enter to `ionic` directory.
* Run `npm install`.
* Run the application with `ionic serve`.
* **Ionic** will be listening in port **`8100`**.

----------
**Firebase Development:**
----------------
* Enter to `firebase` directory.
* For the first time, run:
  * `npm install -g firebase-tools`
* Run `firebase login`.
* List of tasks in **Firebase**:
  * **Functions deployment:** `deploy_functions` or `firebase deploy --only functions`.

----------

**Managing the application on a VPS:**
----------------
* Kill **API** and **Ionic** executing the script **`./kill.sh`**, located in the root of the project.
* Bring latest updates executing the script **`./update.sh`**, located in the root of the project.
* Run **API** and **Ionic** executing the script **`./run.sh`**, located in the root of the project.

----------