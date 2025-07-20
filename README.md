# My To-Do App: A Full-Stack DevOps & Cloud-Native Project

## Project Overview

This project implements a simple To-Do List web application, designed to demonstrate a comprehensive DevOps workflow using modern cloud-native technologies. It covers everything from version control and local development to continuous integration/continuous deployment (CI/CD) and container orchestration on a cloud platform.

The application consists of:
* **Backend:** A Python Flask API for managing tasks (CRUD operations).
* **Frontend:** A static HTML, CSS, and JavaScript interface to interact with the backend.
* **Database:** A PostgreSQL database for persistent storage.

## Features

* **Task Management:** Add, view, update (mark complete), and delete tasks.
* **Containerized Services:** Each component (backend, frontend, database) runs in its own Docker container.
* **Local Development:** Easy setup and execution using `docker-compose`.
* **CI/CD Pipeline:** Automated build, test, and deployment using GitHub Actions.
* **Kubernetes Orchestration:** Deployment and management of the application on a Kubernetes cluster.
* **Cloud Deployment:** Hosting the application on Google Kubernetes Engine (GKE).
* **Version Control:** Full project history and collaboration managed with Git and GitHub.
* **Project Management Integration:** Placeholder for integration with tools like ZenHub or Jira.

## Technologies Used

* **Version Control:** Git, GitHub, GitHub CLI (`gh`)
* **CI/CD:** GitHub Actions
* **Containerization:** Docker, Docker Compose
* **Container Orchestration:** Kubernetes (K8s), `kubectl`
* **Cloud Platform:** Google Cloud Platform (GCP), Google Kubernetes Engine (GKE), Google Artifact Registry
* **Backend:** Python 3.9+, Flask, Flask-SQLAlchemy, Psycopg2
* **Frontend:** HTML5, CSS3, JavaScript
* **Database:** PostgreSQL

## Project Structure
