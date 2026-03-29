# ChemBL Activity Explorer

## Overview

This is a full-stack web application that fetches bioactivity data from the ChemBL API and displays it in a simple UI.

## Features

* Enter Target ID
* Filter by Activity Type (IC50, Ki, etc.)
* View results in table format
* Handles loading and errors

## Tech Stack

* Backend: Spring Boot (Java)
* Frontend: React.js

## How to Run

### 1. Run Backend

Open terminal:
cd backend
mvnw spring-boot:run

Backend runs at:
http://localhost:8080

Test API:
http://localhost:8080/activities?targetId=CHEMBL25

---

### 2. Run Frontend

Open new terminal:
cd frontend
npm install
npm start

Frontend runs at:
http://localhost:3000

---

### 3. Use Application

* Enter Target ID (example: CHEMBL25)
* Select activity type (optional)
* Click search
* View results

## Author

BHUVASYA .G
