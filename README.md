# Backend Design

![Cross-Post Architechure](https://user-images.githubusercontent.com/72073401/139555093-bdfb353d-aa12-46bb-9a8e-e4b73bc4da57.jpg)

# API's

## Get All unpublished posts:

[https://dev.to/api/articles/me/unpublished](https://dev.to/api/articles/me/unpublished)

- Headers:
    
    ```bash
    api-key : MiXvYZyVvqCP1oPjg2AdHhQp
    ```
    

## Schedule a post:

[http://localhost:8080/api/v2/schedule](http://localhost:8080/api/v2/schedule)

- Body:
    
    ```bash
    {
        "articleID": "383924",
        "APIkey": "YOUR_API_KEY",
        "publishTime": "2021-09-23T20:50:41.751Z"
    }
    ```
    

## Cron Jobs

Run the `services/cronJobs.js` file

```bash
node cronJobs.js
```

## Post From Dev to Medium or Hashnode

URI : [`http://localhost:8080/api/v2/dev`](http://localhost:8080/api/v2/dev)

Body:

```json
{
    "url": String,
    "medium": Boolean,
    "hash": Boolean,
    "medium_token": String,
    "hash_token": String
}
```

- `url` : URL of the The Blog from [Dev.to](http://Dev.to) which is to be cross-posted (String)
- `medium` : (Boolean)
- `medium_userID` : User's medium's user ID can be fetched from ([https://api.medium.com/v1/me](https://api.medium.com/v1/me))
- `medium_token` : User's medium's API token
- `hash_token` : User's Hashnode API Token

## Post From Medium to Dev or Hashnode

URI: [`http://localhost:8080/api/v2/medium`](http://localhost:8080/api/v2/medium)

Body:

```json
{
    "url": String,
    "dev_api": String,
    "dev": Boolean,
    "hash": Boolean,
    "hash_api": String
}
```

- `url` : URL of the The Blog from Medium which is to be cross-posted (String)
- `dev` : (Boolean)
- `hash` : (Boolean)
- `dev_api` : User's dev.to API token
- `hash_api` : User's Hashnode API Token

## Post From Hashnode to Dev or Medium

URI: [http://localhost:8080/api/v2/hash](http://localhost:8080/api/v2/hash)

Body:

```json
{
    "url" : String,
    "dev": Boolean,
    "medium": Boolean,
    "dev_api": String,
    "medium_id": String,
    "medium_api": String
}
```
