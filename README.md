# EmployeeSuggestionManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.0.

## Package Manager

Run `npm install` after cloning this repository to install all dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Administrator Interface Documentation

## Assumptions

### User Experience

Administrators are responsible for managing numerous employees. Therefore, the system is designed with a strong emphasis on **separation of concerns** and **data streamlining** to ensure usability, efficiency, and scalability in daily administrative operations.

### Separation of Concerns

The application layout is organized in a clear and self-descriptive manner to promote **intuitive navigation** and **ease of use**.  
Each functional component is logically separated, allowing administrators to focus on specific tasks without unnecessary complexity.

### Data Streamlining

The platform enables administrators to efficiently manage large datasets using **dynamic filters** and **pagination**.  
Filtering options include **employee**, **type**, **status**, **source**, and **priority**, allowing quick data segmentation and improved productivity.

## Functionality

### Creating a New Suggestion

1. Navigate to the **Create** page by expanding the **Suggestion** section in the sidebar and selecting **Create**.
2. Complete all required fields in the form.
3. Click the **Create Suggestion** button to submit the new suggestion.

### Updating an Existing Suggestion

1. Navigate to the **Dashboard** page by expanding the **Suggestion** section in the sidebar and selecting **Dashboard**.
   - If currently on the **Create** page, use the **breadcrumb navigation** at the top-right of the screen to return to the Dashboard.
2. In the dashboard table, click the employee’s name associated with the desired suggestion.
3. The system will redirect you to the **Create** page, where form fields will be automatically pre-populated with the selected suggestion’s details.
4. The **Create** button will now appear as **Update**, indicating edit mode.

> **Note:** The **Source** field of a suggestion cannot be modified.

### Updating the Status of a Suggestion

1. In the **Dashboard** table, hover over the **Status** field of the relevant suggestion and click it.
2. A modal window will appear, prompting you to select a new status.
3. Choose the desired status and click **Update**, or click **Cancel** to abort the action.

> **Note:** This process updates only the status of the suggestion.

## Summary

This documentation provides an overview of the administrative workflow and interaction design principles implemented to support efficient data management and user-friendly operations within the application.
