# Movies from TMDB API

#### Configuration, Install dependencies and Database

- Install Node.js v20.11.1;  
- Run the following commands:  
- `cp .env.example .env`  
- `mkdir data`  
- `sudo chmod -R 777 data`  
- `yarn install`  
- `docker-compose -f docker-compose.yml down`  
- `docker-compose -f docker-compose.yml up -d`  
- `yarn dev`  


#### Database migrations?

- Create a new migration: `npx typeorm migration:create -n AlterTableNameColumnDescription`
- Add the new migration created in this file `src/core/db/migrations/index.ts`.


### Folders Structure

The folder structure must follow the pattern:  
```
--- src
------ modules
--------- user // DTOs, Use Cases and Controller from App User
--------- index.ts // The main controller. We need to import all controllers here
```


### Main Purpose

The purpose of this project is to learn and practice Clean Code and the following stack:  
- Node.js;  
- Typescript;  
- Docker;  
- Clean Code;  
- PostgreSQL;  
- TypeORM;  
- Integration with external APIs.

Here we integrate with the TMDB API to query Trending Movies, map and save a local PostgreSQL database, using TypeORM.

To test, there are two cURLs below:

#### Get All: `curl --location 'http://localhost:3000/movie/all?offset=1&limit=10'`

#### Get By ID: `curl --location 'http://localhost:3000/movie/9a9ef994-77f6-4398-a3a4-c49d843d9be5'`