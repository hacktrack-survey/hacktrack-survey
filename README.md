# hackathon-survey
This is the repository of the survey server for the Praxisprojekt _"How did participants like my hackathon? A benchmarking tool"_ (lead by [colaps](https://www.uni-due.de/colaps/)).

## How To Run
You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Make sure to install all dependencies (using `npm install`) before starting the server the first time.

Run `npm run serverstart` to start server in developer mode (server restarts automatically after each change).
 
## Routes
### `/survey/create`
Get to Creation Form page.

## API
### `/api/forms`
Retrieve all saved Google Survey Forms. Returns: JSON Array

Example:
```json
[
    {
      "formId": "1eHsT9Y4Qxn7F3djzBIPwnPgD8YynouslMkkaIkQ3rag",
      "uuid": "a083950c-2424-41f1-bdb0-92e3126c45c2",
      "meta-data": {
        "name": "Hacking and Cracking",
        "date": "2023-01-01",
        "event_url": "https://www.uni-due.de",
        "competitive": false,
        "mode": "mode_in-person",
        "size": "size_l"
      }
    },
    {
        "formId": "...",
        ...
    }
]
```

If there are no entries, an empty JSON Array is returned:
```json
[]
```

### `/api/form/:uuid`
Retrieve Google Form database entry, given its UUID. Returns: JavaScript Object

Example: `/api/form/a083950c-2424-41f1-bdb0-92e3126c45c2`
```json
{
    "formId": "1eHsT9Y4Qxn7F3djzBIPwnPgD8YynouslMkkaIkQ3rag",
    "uuid": "a083950c-2424-41f1-bdb0-92e3126c45c2",
    "meta-data": {
        "name": "Hacking and Cracking",
        "date": "2023-01-01",
        "event_url": "https://www.uni-due.de",
        "competitive": false,
        "mode": "mode_in-person",
        "size": "size_l"
    }
}
```

If UUID could not be found in database, an empty object is returned:
```json
{ }
```

### `/api/form/:uuid/responses`
Retrieve Google Form responses, given its UUID. Returns: JavaScript Object

Example: `/api/form/a083950c-2424-41f1-bdb0-92e3126c45c2/responses`
```json
{
  "responses": [
    {
      "formId": string,
      "responseId": string,
      "createTime": string,
      "lastSubmittedTime": string,
      "respondentEmail": string,
      "answers": {
        string: {
          ...
        },
        ...
      },
      "totalScore": number
    },
    {
      "formId": string,
      ...
    }
  ],
  "nextPageToken": string
}
```
See [Goolge Forms API Documentation for further information](https://developers.google.com/forms/api/reference/rest/v1/forms.responses/list)

If UUID could not be found in database, an empty object is returned:
```json
{ }
```