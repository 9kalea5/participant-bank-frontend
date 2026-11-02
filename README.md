Participant Management Portal (Angular Frontend)
1. Project Overview

    The Participant Management Portal is a web-based application developed using Angular and Bootstrap 5. It allows administrators to manage participant banks through a simple, responsive user interface.

    The application integrates with a Spring Boot backend and PostgreSQL database to perform participant bank management operations.

    Main Features
    User login and authentication using Keycloak.
    JWT access token management.
    Protected routes using Angular Route Guards.
    View all participant banks.
    Register new participant banks.
    Edit participant bank information.
    Delete participant banks.
    Search and filter participant banks.
    Upload and display bank logos.
    Reactive forms with validation.
    Loading indicators and success/error notifications.
    Centralized HTTP error handling.

2. Technology Stack

    Technology	Purpose
    Angular	Frontend framework
    TypeScript	Application programming language
    Bootstrap 5	Responsive UI styling
    RxJS	Asynchronous operations
    Angular Router	Application navigation
    Angular HttpClient	Backend API communication
    Reactive Forms	Form handling and validation
    Spring Boot 3	Backend REST API
    PostgreSQL	Database
    Keycloak	Authentication and authorization
    Docker	Container management (if used by backend)

3. Project Architecture

    The application follows a frontend-backend architecture.

    text
    Participant Management Portal
              |
              v
        Angular Frontend
        localhost:4200
              |
              | HTTP / REST API
              | Bearer JWT Token
              v
        Spring Boot Backend
        localhost:9081
              |
              v
          PostgreSQL
        localhost:5432
              |
              v
            Database


    Keycloak provides authentication and issues JWT access tokens through the backend authentication API.

4. Prerequisites

    Before running the application, install the following:

    Node.js (compatible with your Angular version).
    npm (Node Package Manager).
    Angular CLI.
    Java (version required by the backend project).
    PostgreSQL.
    Git.
    Backend repository: participant-bank-backend.

    Check your installed versions:

    bash
    node --version
    npm --version
    ng version
    java --version
    git --version

5. Frontend Installation

    Step 1: Clone the frontend repository
    bash
    git clone https://github.com/9kalea5/participant-bank-frontend


    Navigate into the project:

    bash
    cd participant-bank-frontend

    Step 2: Install dependencies
    bash
    npm install

    Step 3: Configure the backend API URL

    Open:

    text
    src/environments/environment.ts


    Configure the API URL:

    typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:9081/api/v1'
    };


    All frontend services should use this environment configuration instead of hardcoded backend URLs.

    Step 4: Start the Angular application
    bash
    ng serve


    Or:

    bash
    ng serve --open


    The frontend will be available at:

    text
    http://localhost:4200

6. Backend Setup

    The frontend requires the participant-bank-backend Spring Boot application.

    Step 1: Clone the backend repository
    bash
    git clone https://github.com/Yibarek/participant-bank-backend


    Navigate into the backend project:

    bash
    cd participant-bank-backend

    Step 2: Select the required backend branch

    For the completed frontend application, use:

    bash
    git checkout branch3-auth-with-logo


    This branch supports:

    Keycloak authentication.
    JWT Bearer token authorization.
    Participant bank CRUD operations.
    Bank logo upload and retrieval.
    Step 3: Configure PostgreSQL

    Ensure PostgreSQL is running on port:

    text
    5432


    Configure the database connection in the backend application configuration.

    Verify that the database name, username, password, and connection URL match your local PostgreSQL setup.

    Step 4: Start the backend

    On Linux/macOS:

    bash
    ./gradlew bootRun


    On Windows:

    bash
    gradlew.bat bootRun


    The backend should run on:

    text
    http://localhost:9081


    Swagger documentation:

    text
    http://localhost:9081/swagger-ui.html

    Step 5: Verify backend connectivity

    Before testing the frontend, make sure the backend is running and its API endpoints are accessible.

7. Authentication

    The application uses the backend authentication endpoint to authenticate users through Keycloak.

    Login Endpoint
    http
    POST /api/v1/auth/login


    Example request:

    json
    {
      "username": "admin",
      "password": "Password@123",
      "grant_type": "password",
      "client_id": "acs_apis_client_api"
    }


    The actual client ID must match the backend Keycloak configuration.

    Authentication Process
    User enters username and password.
    Angular sends credentials to the backend login endpoint.
    Backend authenticates the user through Keycloak.
    Backend returns access and refresh tokens.
    Angular stores tokens in sessionStorage.
    Angular HTTP interceptor attaches the access token to protected API requests.
    AuthGuard protects participant routes.
    Logout clears the stored authentication tokens.

8. Backend API Endpoints

    All participant APIs use the base URL:

    text
    http://localhost:9081/api/v1

    HTTP Method	Endpoint	Description
    POST	/auth/login	Authenticate user
    GET	/participants	Retrieve all participants
    GET	/participants/{id}	Retrieve participant by ID
    POST	/participants	Create participant
    PUT	/participants/{id}	Update participant
    DELETE	/participants/{id}	Delete participant
    POST	/participants/{id}/logo	Upload participant logo
    GET	/uploads/logos/{filename}	Retrieve participant logo

    Participant management endpoints require a valid Bearer access token on the authenticated backend branch.

9. Environment Configuration

    Backend API URLs are centrally managed through:

    text
    src/environments/environment.ts


    Example:

    typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:9081/api/v1'
    };


    Example usage inside an Angular service:

    typescript
    import { environment } from '../../environments/environment';

    private readonly apiUrl =
      `${environment.apiUrl}/participants`;


    This makes it easier to change backend URLs without modifying individual services.

10. Running and Testing the Application

    Start PostgreSQL, the backend, and the frontend.

    Recommended startup order:

    Start PostgreSQL.
    Start the backend application.
    Verify Keycloak authentication is available through the backend.
    Start the Angular frontend.
    Open http://localhost:4200.
    Build the Angular application
    bash
    ng build


    The build should complete without compilation errors.

    Run Angular tests
    bash
    ng test

11. Git Workflow

    The project follows a task-based Git branching strategy.

    Each onboarding task is developed in a separate branch.

    Branch Naming Convention
    text
    task/01-login-static
    task/02-routing-layout
    task/03-participant-list
    task/04-add-participant
    task/05-edit-participant
    task/06-reactive-forms
    task/07-springboot-integration
    task/08-shared-components
    task/09-http-interceptor-logo
    task/10-auth-guard
    task/11-oidc-authentication
    task/12-environments-tests

    Create a task branch
    bash
    git checkout main
    git pull origin main

    git checkout -b task/12-environments-tests

    Commit changes
    bash
    git add .

    git commit -m "setup environment configurations and project documentation"

    Push the branch
    bash
    git push -u origin task/12-environments-tests

    Merge completed work

    After verification and team approval:

    bash
    git checkout main
    git pull origin main

    git merge task/12-environments-tests

    git push origin main

12. Troubleshooting
    Backend connection errors

    Ensure the Spring Boot backend is running on port 9081.

    CORS errors

    If the browser reports CORS errors, configure the backend to allow requests from:

    text
    http://localhost:4200


    Alternatively, configure an Angular development proxy if appropriate.

    HTTP 401 Unauthorized

    Check the following:

    User credentials are correct.
    Access token is stored in sessionStorage.
    HTTP interceptor attaches the Bearer token.
    Access token has not expired.
    User has the required backend permissions.
    Logo upload errors

    When uploading files using FormData, do not manually set the Content-Type header. The browser must generate the multipart boundary.

    Angular build errors

    Run:

    bash
    npm install
    ng build


    Review the terminal output for missing dependencies, TypeScript errors, or incorrect imports.

13. Project Completion

    This project follows a 12-task practical Angular onboarding curriculum.

    Stage 1: Angular Fundamentals
    Task 01: Static Login Page.
    Task 02: Routing and Application Layout.
    Task 03: Participant List Using Mock Data.
    Task 04: Register Participant.
    Task 05: Edit Participant Information.
    Task 06: Reactive Forms and Validation.
    Stage 2: Spring Boot Backend Integration
    Task 07: Spring Boot REST API Integration.
    Task 08: Shared UI Components.
    Task 09: Logo Upload and HTTP Error Handling.
    Task 10: Authentication Guard.
    Task 11: Keycloak Login and Bearer Token Interceptor.
    Task 12: Environment Configuration and Documentation.

    Final Objective: Complete all 12 tasks, verify the Angular build, and merge the completed task branches into the main branch.

    Participant Bank Frontend – Angular Frontend

    Developed as part of the Angular onboarding practical curriculum.