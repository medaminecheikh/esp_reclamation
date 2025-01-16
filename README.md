# **App**

## **SonarCloud Project Badges**

| **Metric**               | **Badge**                                                                                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Overall**              | [![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)    |
| **Quality Gate Status**  | [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |
| **Bugs**                 | [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=bugs)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)                    |
| **Code Smells**          | [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation)      |
| **Duplicated Lines (%)** | [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |
| **Security Rating**      | [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |
| **Vulnerabilities**      | [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |
| **Maintainability Rating** | [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |
| **Reliability Rating**   | [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=medaminecheikh_esp_reclamation&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=medaminecheikh_esp_reclamation) |

---

## **Prerequisites**

1. Install **Node.js** and **npm** on your machine.
2. Have a **Jira account** and an active **Jira project**.

## **Dashboard Interface**

The dashboard provides an interactive view of project data and reclamations, featuring the following sections:

### **1. Reclamation Form**
- Allows users to submit complaints or feedback related to projects.
- Features include:
    - Dynamic form validation.
    - Attachments for supporting evidence.
    - Category selection for reclamations.

### **2. Logs**
- Displays system and project-related logs.
- Logs include timestamps, user actions, and status updates.
- Supports filtering by project, user, or log type.

### **3. Managing Reclamations**
- Admin interface for handling submitted reclamations.
- Options for assigning, updating statuses, or closing reclamations.
- Provides detailed reclamation history for auditing purposes.

### **4. Projects Management**
- Lists all active and archived projects.
- Displays issue counts ("Done," "In Progress," "To Do").
- Interactive project actions, such as assigning team members or tracking progress.

### **5. Login**
- Secure authentication system using JWT.
- Role-based access control for users (e.g., Admin, Team Member, Viewer).
- Includes a password recovery and account management system.

---

## **Screenshots**

### Login
![Login Screenshot](src/assets/screenshot/login.png)

### Dashboard Overview
![Dashboard Screenshot](src/assets/screenshot/Dash.png)

### Reclamation Form
![Reclamation Form Screenshot](src/assets/screenshot/recl.png)

### Logs
![Logs Screenshot](src/assets/screenshot/rechistory.png)

### Managing Reclamations
![Managing Reclamations Screenshot](src/assets/screenshot/detail.png)

### Projects Management
![Projects Management Screenshot](src/assets/screenshot/Project.png)


---
