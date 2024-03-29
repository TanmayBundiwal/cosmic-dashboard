# Space Dashboard

## Overview 
The Space Dashboard is a web application that aggregates and displays real-time space-related data, utilizing various NASA APIs. This project serves as a practical application of Agile development methodologies and modern web technologies, reflecting my journey in evolving as a Solutions Engineer.

## Agile Development Approach
In line with Agile principles, the Space Dashboard is being developed iteratively. Each version is a result of focused sprints, ensuring a usable and valuable product at every stage. This approach not only aligns with efficient project management practices but also facilitates continuous integration of feedback and improvement.

## Version 1: React Foundation
The initial version, built with React, set the foundational stone for this journey. It's a minimalistic yet functional starting point, embodying the core features:
- Astronomy Picture of the Day (APOD): Displays NASA's daily space image along with its explanation.
- Near Earth Objects (NEO) Tracking: Lists and tracks asteroids and comets passing near Earth.
- Mars Rover Photos: Showcases the latest images from NASA's Mars rovers.
- Space Weather Events (DONKI): Provides updates on space weather events.

## Version 2: Full-Stack Integration with Node.js
The second sprint brought a significant enhancement, transitioning the Space Dashboard into a full-stack application:
- Integrated Node.js, enriching the backend capabilities of the application.
- Implemented environment variables for enhanced security and configuration management.
- Improved data handling and API interactions, paving the way for more sophisticated features.

## Version 3: Data Visualization with D3.js
In this version, interactive and dynamic visualization features were introduced, particularly for asteroid data.

## Version 4: Enhanced UI/UX
This version updated the card styling of DONKI API information and added a popup screen when the page is loaded to explain what the project achieves.


## Project Setup
To get started with the Space Dashboard, follow these steps:
1. **Clone the repository**
2. **Navigate to the project directory**: `cd space-dashboard`
3. **Install dependencies**: `npm install`
4. **Set up Environment Variables**:
   - Rename `.env.example` to `.env`.
   - Obtain a NASA API key and fill in the value in the `.env` file.
5. **Run the application**: `npm start`

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:
- `NASA_API_KEY`: Your personal API key for NASA's data services.

## Live Demo
A live version of the application is available [here](http://cosmic-dashboard-reactonly-app.s3-website-us-east-1.amazonaws.com).

## Important Note on live Demo: 
The Cosmic Dashboard has evolved through its versions as a full-stack application combining a Node.js backend with a React.js frontend. However, to optimize ongoing costs and resource utilization, the live version currently hosted on AWS has been adapted to a React-only format. This adjustment ensures cost-effectiveness while maintaining the core functionality and user experience, though it does mean that some backend-dependent features are temporarily streamlined. This decision reflects a pragmatic approach to balancing project sustainability with financial considerations.


## Contributing
Contributions, feedback, and suggestions are warmly welcomed as this project is a platform for continuous learning and collaboration.

## License
This project is open-source and available under the MIT License.

Embark on this exciting journey with me as the Space Dashboard evolves, showcasing the fusion of Agile development, modern web technologies, and the mysteries of space!
