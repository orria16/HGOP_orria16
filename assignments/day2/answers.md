# Docker Exercise
This excercises' main focus is to get us to become familiar with the Docker system, try running it on our machines, sharing images through Docker-cloud so that any one can try to run Containers on their machines. First step was just to set up and install Docker and Docker-compose and test them with docker's default hello-world test. Then we try to set up and excercise with a given NodeJS and Postgres mini application.

# What is Docker?
Docker is a tool designed to create, deploy and run applications by using containers. Containers pack everything an application needs to run, regardless of any customized settings other machines might have. It performs Operating System level virtualization.

# What is the difference between:
Virtual Machine
Docker Container
Docker Image
A Docker Image is an ordered collection of root filesystem changes and the corresponding execution parameters for use within a container runtime. They include everything you need to run the software with, code, runtime, system tools, system libraries and settings. Images are read-only.

# Docker Container is a running instance of an Image. You can have many Containers of an image on the same machine.

Containers and Virtual Machines are similar in many ways. They have resource isolation to simulate usage on a different computer, basically a sand-box that cannot tamper with the rest of the system. The difference between the two is that Containers are more portable and efficient, as it virtualize the operating system rather than the hardware. Dockers are more secure as they provide the strongest default isolation capabilities in the industry.

Virtual machines require a new Operating System for each instance of VMs, which can take up a lot of hardware resources (Memory, Disk space etc). Whereas Dockers share the host's Operating system's Kernel.

# Web API?
Also known as "Web Application Programing Inteface". This is some kind an interface that allows developers to access features or data of an application, operating system or other services. It works like a waiter in a restaurant, where it takes orders from the customers (users/programmers) that they selected from the menu (like an interface) and sends it back to the kitchen, the kitchen then do all the work required to be able to send what the waiter asked them, then the waiter serves the food (result/outcome) to the customers. In a web context, when a user does an action on a website, the website then sends an API call to the business layer and that sends a response back to the web interface. These are usually HTTP requests and response.

# Postgres?
Postgres is an open source object-relational database system and as a database server its main function is to store data. It can handle workloads ranging from small single-machine applications to large applications with many concurrent users. Postgres or PostgreSQL is an ACID-compliant and supports triggers, functions and materialized views. Postgres provides immunity to dirty reads and and avoids locking issues by using a multiversion concurrency control. Being open source, postgres has a large number of extensions written by third parties.

package.json file dependencies field:
The dependencies field tells the program what NPM packages the NodeJS application is required to do certain jobs. This is useful as when another developer starts developing on the same project, instead of having to download and upload (git pull/clone/push) the whole application that can be more than 100 megabytes, which can take time and resource, the developer simply runs 'npm install' to get NPM to fetch all packages required for them to work on the application.

# NPM express package:
Express is a minimal and flexible web application framework. It provides features that allows developers to rapidly develop web and mobile applications. Its core features are:

Middlewares to response to HTTP Requests
HTTP Method and URL routing definitions
Dynamic HTML pages rendering based on passing arguments to templates

# NPM pg package:
Also known as 'Node-postgres'. It is a package of modules that allows the NodeJS application to interface with our PostgreSQL server.

# What is docker-compose:
Docker-compose is built to work with Docker. Compose is a tool for defining and running multi-container Docker applications.

# Results
Like mentioned in the first section we have learned the basics of how to use Docker (and Docker-compose) and apply them to simple applications. As well as sharing images to Docker Cloud so that others (partner) and run them on their machine.