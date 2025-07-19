___-------------- Machine Test Completed --------------___

Project Name : MedBook - Doctor's prescription Management

Overview:
MedBook is a full-stack web application designed for doctors to easily create, manage, and review patients prescriptions. It features a modern dashboard, doctor profile, patient form, medicine recommentations via OpenFDA free API, preview page, edit patient form, and print option is also implemented. 

Code Structure: 
|src/
├──  components
│   ├── Sidebar.jsx
│   ├── Header.jsx
|   ├── DashHeader.jsx
│   ├── DashLayout.jsx
│   ├── DashMain.jsx
|   ├── DashProfile.jsx
│   ├── Footer.jsx
|   └── TokenProvider.jsx
|
├──  App.jsx (defines routes)
│
├──  pages
│   ├── Dashboard.jsx
│   ├── NewPrescriptionPage.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── MyPrescriptionPage.jsx
│   ├── EditPrescriptionPage.jsx
│   ├── Pnf.jsx
│   └── PreviewPage.jsx
│
├──  contexts
│   ├── AuthProvider.jsx
│   ├── PresProvider.jsx
│
├──  services
│   ├── allAPI.js (handles REST + OpenFDA)
|   ├── commonAPI.js
│   └── serverURL.js
├──  styles
│   └── Calender.js

External Libraries Used:

react-router-dom
axios
react-hot-toast
react-icons
react-calender
tailwindcss
jspdf & html2canvas

Functionalities : 
1.Full Responsible for Desktop, Mobile, tablet
1.State Management are done by using the Context API method.
2.Authentication is done by using JWT.
3.Prescription can be created by logged in doctor, and have the ability to edit , print, see prescription history.
4.Medicine Name Suggestion by using the OpenFDA Drug Label API, It Displays a real-time suggestions in a dropdown as the user types.


