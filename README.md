# Highfive help desk
A web application to assist IT technicians to document previous resolved problems. It is common for technicians to handle similar problems from different customers. The process to resolve these problems can be tedious but repetitive. Our application aims to help technicians find solutions quicker by providing an archive of previous resolved problems implemented with a search function to locate them.

The design consists of 3 modules of users, each user is granted unique features.

Admin: handles administration, updating of user information, and manages workload configuration

Client: able to create requests of workloads for technician to handle

User/IT technician: choose from list of workloads to handle and resolve. Able to reply to client about resolution of workload. Able to search keywords from archived workloads for similar problems

Workload: an entity within the database model. A workload is requested by a client

Note: Frontend developed with angular6, backend using LoopBackAPI and MongoDB

## FrontEndAgular6Express3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
