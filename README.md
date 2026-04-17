# teste
# Java-App-DevOps (Part 2)

This repository is the second part of the DevOps project available at https://github.com/MarcosCantelli/DevOps-MVRC-IAC.

The main goal of this part is to deploy a complete application stack on an infrastructure provisioned by the first project, using a Jenkins pipeline to build, package and deploy the application.

## What is included

- `backend/`: Java Spring Boot ecommerce API
- `frontend/`: Angular frontend application
- `Dockerfile`: multi-stage container build combining Angular, Spring Boot and Nginx
- `docker-compose.yml`: local service definition for the app container
- `Jenkinsfile`: Jenkins pipeline to build the Docker image and deploy it to a remote VM

## Architecture

1. Build Angular frontend in a Node stage
2. Build Java backend in a Maven stage
3. Create a runtime image with OpenJDK, Nginx and the built artifacts
4. Deploy the Docker image to a remote VM via Jenkins
5. Run the container exposing ports `80` and `8080`

## Pipeline behavior

The Jenkinsfile performs these key actions:

- Checkout the repository
- Build the Docker image with tags `ecommerce-app:${BUILD_NUMBER}` and `ecommerce-app:latest`
- Save and copy the image to the remote VM using SSH
- Load the image on the VM, stop/remove any previous container, then run a fresh `ecommerce` container
- Verify the deployment by checking the frontend and backend endpoints

## Deployment intent

This repo is intended to be deployed on a VM provisioned and configured by the first project, which uses Terraform and Ansible.

In this part, the focus is the application delivery pipeline:

- build artifacts
- package into Docker
- transfer image to target host
- start the service

## Notes

- The app uses environment variables for database configuration (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`)
- The Jenkins pipeline expects SSH access to the remote host and stored credentials for database settings
- The final container exposes both `80` for frontend and `8080` for backend API access
