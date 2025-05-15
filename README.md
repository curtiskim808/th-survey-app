# Secure Mental Health Survey App

This app provides a secure way to collect and store sensitive mental health data. It consists of a Ruby on Rails backend API and a React frontend.

Tech Stack

- Node.js: v22
- React: v19 with TypeScript
- Ruby: v3.4
  Ruby on Rails: v8.0.1
  Database: sqlite for development (postgresql for Prod)

## Getting Started

#### Technical Design Document (TDD)

Please take a look at this document first to get overall development idea.

- https://docs.google.com/document/d/1nkEQSz1Nhh81z4uL99TbX6MXpA2JIvWRIdwNM0JYHOg/edit?usp=sharing

#### Application Demo

Please check the application demo here!

- https://mental-health-survey-fe.netlify.app/

#### Backend API Endpoints

- API Document : https://tickit-health-be-4a831c1a1333.herokuapp.com/api-docs

#### Prerequisites

- Docker and Docker Compose
- Run the application using Docker Compose:
- The frontend will be available at http://localhost:5173 and the backend at http://localhost:3000.

```bash
# update env file name .env.example to .env
# mental_health_surve_fe/.env.example => .env
# mental_health_surve_be/.env.example => .env

# on root
# run
docker-compose up --build


# close
docker-compose down
```

#### How to run Unit Tests

```bash
# frontend

cd mental_health_survey_fe

npm i

npm test


# backend

cd mental_health_survey_be

bundle i

bundle exec rspec
```

#### Database Structure

SurveyResponses Schema

Data Encryption
All sensitive survey data is encrypted before being stored in the database.

```bash
# The primary fields store encrypted data:
today_feeling - Encrypted data about how the person is feeling
stress_level - Encrypted stress level rating
comments - Encrypted comments provided by the respondent
respondent_id - Encrypted identifier for the survey respondent

# For each encrypted field, there's a corresponding _bidx field:
today_feeling_bidx
stress_level_bidx
comments_bidx
respondent_id_bidx
```

Example

```bash
id: 42
today_feeling: "AES-256-GCM:Fb8nJd4+tDxY9szVjkAn7mLx2vYqT6Bg4RfcZH3KLts4Up7cqRbpVA=="
stress_level: "AES-256-GCM:Lp2iQbU7kTmS9oWxZXfHaDr5c+vYNgE8JtFdKjVpQ=="
comments: "AES-256-GCM:XpB2qN8tJ6vGm4HsKfZLrD3w9Ty7aWkUcV5P+YbE1nxCjQpMs8FzLdR9KuA=="
today_feeling_bidx: "7d9fe79cefd453a34eb71e8fca38750f"
stress_level_bidx: "9c6f897c5430c7f44ccd5fa82318b076"
comments_bidx: "1f3870be274f6c49b3e31a0c6728957f"
created_at: "2023-05-15 10:30:00"
updated_at: "2023-05-15 10:30:00"
respondent_id: "AES-256-GCM:Jw7nL+p2xKfRb6TgVcPsA9EiY8mZuQtX3D5vBaH="
respondent_id_bidx: "e8dc057914c3c193168c76a6ad4c5583"
```
