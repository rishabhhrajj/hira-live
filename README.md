# Hira Live — Real-Time Live Streaming Platform

## Project Overview

**Hira Live** is a web-based live-streaming application designed to enable secure, real-time media streaming between a broadcaster and multiple viewers. The application uses a role-based access system to distinguish between the administrator/broadcaster and viewers, ensuring that only authorized users can access the streaming room with the appropriate permissions.

The backend is built using **Node.js and Express.js**, while **LiveKit** provides the real-time media communication infrastructure. The application generates JWT-based access tokens to control room access and media permissions, allowing the broadcaster to publish media streams and viewers to subscribe to them.

The project demonstrates the integration of web technologies, backend API development, authentication, access control, and real-time communication to build a live-streaming experience.

### Key Features

- **Live Streaming:** Real-time media communication between a broadcaster and viewers.
- **Role-Based Access Control:** Separate permissions for broadcasters and viewers.
- **Authentication:** Password-based verification for protected access.
- **Secure Token Generation:** JWT-based access tokens for authorized room connections.
- **Real-Time Media Infrastructure:** Integration with LiveKit for media streaming.
- **Backend API:** REST endpoints built with Express.js to handle authentication and token generation.
- **Web-Based Interface:** Browser-accessible application for interacting with the streaming platform.

### Technology Stack

- **Backend:** Node.js, Express.js
- **Programming Language:** JavaScript
- **Real-Time Communication:** LiveKit
- **Authentication & Authorization:** JWT, password verification
- **Deployment and Hosting:** Render 

### Project Objective

The primary objective of Hira Live is to develop a role-controlled live-streaming platform by integrating a web backend with real-time media infrastructure. It explores how authentication, authorization, token-based access, and real-time media delivery work together in a full-stack application.

### Future Enhancements

- Real-time chat between the broadcaster and viewers.
- Viewer count and participant management.
- Improved authentication and session management.
- Responsive interface for mobile and desktop devices.
- Stream status indicators and connection recovery.
