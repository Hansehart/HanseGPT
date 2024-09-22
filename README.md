# HanseGPT

Project for the Hackathon "Ai Ai Captain"
Location: Bremen
Date: 20.09.2024

# Spring WAR and NPM Build Tutorial

This README provides instructions for building a .war file for a Spring backend and running an npm build for a frontend project.

## Project Structure

```
project-root/
├── frontend/
│   └── artifact/
├── backend/
│   └── artifact/
└── README.md
```

## Backend: Building a .war file with Spring

1. Navigate to the backend directory:
   ```
   cd backend/artifact
   ```

2. Ensure you have Maven installed. You can check by running:
   ```
   mvn -version
   ```

3. Run the Maven package command to build the .war file:
   ```
   mvn clean package
   ```

4. The .war file will be generated in the `backend/artifact` directory.

## Frontend: Running npm build

1. Navigate to the frontend directory:
   ```
   cd frontend/artifact
   ```

2. Ensure you have Node.js and npm installed. You can check by running:
   ```
   node --version
   npm --version
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

4. Run the build command:
   ```
   npm run build
   ```

5. The built files will be generated in the `frontend/artifact` directory.

## Additional Notes

- Make sure your `pom.xml` file in the backend is configured to output the .war file to the `artifact` directory.
- In your frontend's `package.json`, ensure the `build` script is set up to output files to the `artifact` directory.

For more detailed configuration, refer to the Spring and React/Vue/Angular (whichever you're using) documentation.