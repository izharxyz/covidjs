# COVIDJS - COVID-19 Timeline Data Viewer

A one-page web application that allows users to view and filter COVID-19 timeline data by selecting a custom date range. This app provides cumulative data for cases, deaths, and recoveries, and converts them into daily values (by calculating the difference between consecutive days). Users can easily explore the data in an interactive and intuitive way.

## Features

-   **Interactive Date Picker**: Allows users to select a custom date range to filter the data.
-   **Cumulative Data Transformation**: The app takes cumulative data and calculates daily values by subtracting the previous day's values.
-   **Chronological Sorting**: Data entries are sorted chronologically to ensure accurate daily calculations.
-   **Responsive Design**: The app is fully responsive, making it accessible across devices (desktop, tablet, mobile).
-   **Data Visualization**: Displays COVID-19 data for cases, deaths, and recoveries.

## Tech Stack

-   **Frontend**:
    -   React.js
    -   TypeScript
    -   Tailwind CSS
    -   React DatePicker
-   **Backend**:
    -   Not used in this project (this is a frontend-only app)

## Installation

Follow these steps to run the app locally:

### Prerequisites

-   Node.js (v18.x or higher)
-   npm (v8.x or higher) or yarn (v1.x or higher)

### Steps to Run Locally

1. **Clone the Repository**

    First, clone the repository to your local machine:

    ```bash
    git clone https://github.com/izharxyz/covidjs.git
    cd covidjs
    ```

2. **Install Dependencies**

    Next, install the necessary dependencies using npm or yarn:

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Run the App**

    Finally, run the app using npm or yarn:

    ```bash
     npm start
     # or
     yarn start
    ```

    The app should now be running on [http://localhost:3000](http://localhost:3000).

### Features Walkthrough

#### Date Range Filter

The app allows users to select a date range using a date picker. Upon selecting the "from" and "to" dates, the app filters the COVID-19 data within that range. The selected date range is displayed above the date picker for clarity.

-   Start Date: The "from" date in the date range.
-   End Date: The "to" date in the date range.

#### Responsive Design

The app is fully responsive and optimized for all screen sizes:

-   On larger screens (desktops), the layout uses a horizontal format.
-   On smaller screens (mobiles and tablets), the layout adjusts to ensure usability.

### Code Structure

Here's a brief overview of the main files and directories in the project:

-   src/: Contains the main application code.

    -   components/: Contains reusable React components like DateRangePicker.
    -   App.tsx: The main entry point for the app.
    -   index.tsx: The root of the React application where ReactDOM renders the app.
    -   types.ts: Contains TypeScript types for the data used in the app (e.g., DiseaseData).
    -   hooks.ts: Contains custom React hooks to fetch data in the app.

-   public/: Static assets like images and the HTML template.
    -   index.html: The HTML template where the app is rendered.
