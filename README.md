# EmployeeSuggestionManagement

## Running the Application

### 1.⁠ ⁠Clone the repository and install dependencies:

```bash
git clone https://github.com/shevaray/Employee-Suggestion-Management.git
cd Employee-Suggestion-Management
npm install
```

### 2. Start the development server:

```bash
ng serve
```

The app will run on http://localhost:4200.

### To build for production:

```bash
ng build
```

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

## Architectural Decisions

## Overview

The system was designed with three primary objectives: **usability**, **maintainability**, and **scalability**.  
Each architectural choice was made to enable administrators to manage large datasets efficiently and accurately, while ensuring the system can evolve alongside organizational needs.

## Key Decisions

### 1. Separation of Concerns

The system is organized so that each core function including user management, suggestion tracking, and status updates operates independently.  
This modular structure facilitates maintenance, testing, and updates without impacting unrelated components.

### 2. Efficient Data Management

Given the volume of data administrators handle, the system incorporates **pagination** and **dynamic filtering**.  
**NgRx state management** is used to maintain a consistent and predictable application state, ensuring **high responsiveness** and performance even with extensive datasets.

### 3. User Centered Design

The interface is crafted around administrative workflows, prioritizing **clarity, simplicity, and responsiveness**.  
Elements such as intuitive navigation, structured layouts, breadcrumbs, and contextual modals enhance usability across devices and screen sizes.

### 4. Scalability and Extensibility

The architecture supports future growth, allowing additional modules such as analytics and reporting tools to be integrated seamlessly without major redesigns.

### 5. Data Integrity

Immutable fields such as the “Source” of a suggestion ensure accurate record keeping and prevent inadvertent data modification, preserving a reliable audit trail.

## Summary

The Employee Suggestion Management application is an Angular-based platform designed to streamline the creation, tracking, and management of employee suggestions. It emphasizes usability, maintainability, and scalability to support administrators handling large datasets efficiently.
