# Meeting Manager 
An application to help organizations keep meetings simple and automated.

## About

## For developers

### Installation

Next is a list containing the software needed to contribute to this project and 
how to install it

#### Docker

- On Windows: [Docker Desktop installation guide for windows](https://docs.docker.com/desktop/windows/install)
- On Linux: 
  - Ubuntu: [Docker installation guide for ubuntu](https://docs.docker.com/engine/install/ubuntu)
  - Archlinux: `# pacman -S docker`, more information [Docker - ArchWiki](https://wiki.archlinux.org/title/docker)
  
  The docker command can only be run as root unless your user is on the docker group. To add yourself to the 
  docker group use this command `# gpasswd -a <your_username> docker`

#### Docker Compose

Before installing docker compose, **docker must be installed**

- On Windows: Docker compose comes preinstalled with Docker Desktop
- On Linux: [Docker Compose installation guide](https://docs.docker.com/compose/install/)

  - Archlinux: Arch users can install Docker Compose by simply executing this command: `# pacman -S docker-compose`

#### Node and npm

To manage versions of Node and npm is recommended to install nvm ( Node Version Manager )

- On Windows: [nvm installation guide for Windows](https://github.com/coreybutler/nvm-windows)
- On Linux: [nvm installation guide for Linux](https://gist.github.com/d2s/372b5943bce17b964a79)

### Developing

#### Installing node dependencies

After installing all needed development dependencies these are the steps required to start developing.

1. `nvm install v16.14.0`
2. `npm install -g @angular/cli`
3. `cd Client`
4. `npm install`
5. `cd ../Server`
6. `npm install`
7. `cd ..`

This commands will install all the node modules needed for the Angular app and the Node REST API

#### Setting up the docker environment

Now you can run `docker compose up` to set up all needed containers. This is the only command you need to use each session to start working.

By doing so everything is set up so that you can edit the Angular application or the Node server and all changes
will be updated to the corresponding running container immediately without using any command. 

To shut down all containers all you have to do is press `Ctrl + C` on the terminal where you invoked `docker compose up` or use docker compose down from the root of the project.

#### Accessing the database

To be able to access the database you only need to follow three steps:

1. First, change the values in the file named .env
   - Change USER_ID's value to the output of `# id -u`
   - Change GROUP_ID's value to the output of `# id -g`
2. Second, use this command after **setting up the docker environment** `docker exec -it postgres psql -U admin`
3. Introduce the password (1234) and you are good to go!
