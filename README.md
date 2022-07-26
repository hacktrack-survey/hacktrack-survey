# hackathon-survey
This is the repository of the survey server for the Praxisprojekt _"How did participants like my hackathon? A benchmarking tool"_ (lead by [colaps](https://www.uni-due.de/colaps/)).

## How To Run
### Prerequisites
You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

Make sure to install all dependencies (using `npm install`) before starting the server the first time.

### Environment Variables
A .env file needs to be created since credentials for using the Google and Nodemailer API are required.<br>
The file needs to contain the following variables:
```env
GAPI_TYPE                       =...
GAPI_PROJECT_ID                 =...
GAPI_PRIVATE_KEY_ID             =...
GAPI_PRIVATE_KEY                =...
GAPI_CLIENT_EMAIL               =...
GAPI_CLIENT_ID                  =...
GAPI_AUTH_URI                   =...
GAPI_TOKEN_URI                  =...
GAPI_AUTH_PROVIDER_X509_CERT_URL=...
GAPI_CLIENT_X509_CERT_URL       =...

MAIL_TOKEN=...
EMAIL_WP  =...
EMAIL_PORT=...
EMAIL     =...
EMAIL_HOST=...
```
Variables starting with `GAPI` are needed for the authentication as a [Google Service Account](https://cloud.google.com/iam/docs/service-accounts). These can be extracted from the `credentials.json`, available in the [Google Cloud Console](https://console.cloud.google.com/).<br>
The remaining variables are needed to set up and use the email module [Nodemailer](https://www.npmjs.com/package/nodemailer).

### Run server
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
      "responseId":"ACYDBNjQbCzzagBwe7tmO-zDsPEP3XIgbK8_ebpORH43W1AOEqhZHg9NcHOTXv8KbzSjdTQ",
      "createTime": "2022-06-17T16:39:19.545Z",
      "lastSubmittedTime": "2022-06-17T16:39:19.545295Z",
      "answers": {
        "00000124": {
          "questionId": "00000124",
          "textAnswers": {
            "answers": [
              {
                "value": "..."
              }
            ]
          }
        },
        "00000123": {
          ...
        },
        ...
      }
    },
    ...
  ]
}
```
See [Goolge Forms API Documentation for further information](https://developers.google.com/forms/api/reference/rest/v1/forms.responses/list)

If UUID could not be found in database, an empty object is returned:
```json
{ }
```