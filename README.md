# React Jira Integration Setup
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=bugs)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)
## Prerequisites
1. Node.js and npm installed on your machine.
2. A Jira account and a Jira project.

## Project Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Credentials

In your project, navigate to `services/jiraAPI/requests.js`. Configure your Jira credentials and server domain as follows:

```javascript
import { JIRA_USERNAME, JIRA_PASSWORD } from '../utils/jiraConst';

export const jiraAuth = {
  username: JIRA_USERNAME,
  password: JIRA_PASSWORD,
};

export const jiraRequest = {
  url: `http://localhost:8080/`, // Replace with your Jira server domain
  // Other configurations...
};
```


### Step 4: CORS Configuration

In Jira, set your app's address as allowed to avoid CORS errors. This can be done in the Jira server configuration settings. You need to whitelist your frontend URL in the Jira CORS settings.

### Step 5: Create a Custom Field in Jira

1. Go to Jira Administration > Issues.
2. Under Fields, click Custom Fields.
3. Click "Add Custom Field".
4. Choose a field type and click "Next". (e.g., Text Field)
5. Name your custom field 'Sendermail' and configure it as needed.
6. Add this field to the screens used by your project.
/* the custom field should be customfield_10112 or else change it in 'ReclamationForm.js' */
### Step 6: Start the Development Server

```bash
npm start
```

## Usual React Setup Process

### Create a New React App

If you haven't already created your React app, you can do so using Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

This will create a new React application and start the development server.

### Directory Structure

Ensure your project has the following structure:

```
my-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   │   ├── jiraAPI/
│   │   │   └── requests.js
│   ├── utils/
│   │   └── jiraConst.js
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
├── README.md
└── ...
```
## for Production mode : Set Up Environment Variables

Create a `.env` file in the root of your project and add your Jira credentials:

```env
REACT_APP_JIRA_USERNAME=<your-jira-username>
REACT_APP_JIRA_PASSWORD=<your-jira-password>
REACT_APP_JIRA_DOMAIN=<your-jira-domain>
```

Update `services/jiraAPI/requests.js` to use these environment variables:

```javascript
export const jiraAuth = {
  username: process.env.REACT_APP_JIRA_USERNAME,
  password: process.env.REACT_APP_JIRA_PASSWORD,
};

export const jiraRequest = {
  url: process.env.REACT_APP_JIRA_DOMAIN,
  // Other configurations...
};
```
### Useful Scripts

- **Start the development server**: `npm start`
- **Build for production**: `npm run build`
- **Run tests**: `npm test`

### Additional Setup

1. **Eslint and Prettier**: Configure Eslint and Prettier for consistent code formatting.
2. **Environment Variables**: Use `.env` file to manage environment-specific configurations.

## Conclusion

Follow the steps above to configure your React app to work with Jira, handle CORS issues, and set up the necessary Jira custom fields. For further customization, refer to the Jira and React documentation.
