# Velour Society (React Version)

This is the React conversion of the Velour Society e-commerce project for our college evaluation.

## How to Run This Project

You must run **TWO** servers at the same time for this project to work.

### Prerequisites

1.  Install `json-server` globally (you only need to do this once):
    ```bash
    npm install -g json-server
    ```

### Running the App

1.  Clone the repo and install all the React packages:
    ```bash
    git clone [https://github.com/](https://github.com/)[YOUR_USERNAME]/velour-society-react.git
    cd velour-society-react
    npm install
    ```

2.  **Start Server 1 (The React App):**
    Open a terminal and run:
    ```bash
    npm run dev
    ```

3.  **Start Server 2 (The Database):**
    Open a **NEW** terminal (in the *same* folder) and run:
    ```bash
    json-server --watch db.json
    ```

The app will be running at `http://localhost:5173`.