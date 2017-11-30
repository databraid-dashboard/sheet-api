[ ![Codeship Status for databraid-dashboard/sheet-api](https://app.codeship.com/projects/ea3e8280-7fa4-0135-2d31-72fb077510aa/status?branch=master)](https://app.codeship.com/projects/246443)

# Databraid Sheet API


## Description
This is an API for the Google Sheets widget. It represents a microservice that functions in conjunction with the [Sheets Single Page Application](https://github.com/databraid-dashboard/sheet-spa) or as part of the [Databraid Dashboard](https://github.com/databraid-dashboard/dashboard-spa). This API leverages [GraphQL](http://graphql.org/) to create a powerful and fast singular endpoint to access the [Google Sheets API](https://developers.google.com/sheets/api/). With this widget, you can project your most relevant Google Spreadsheet file into your dashboard.  
## Usage


If you have a Google account, you're well on your way! Please fork and clone this repository, before beginning make sure you have Docker installed and running, then from the command line:


```
npm i
npm run up
```
This will compose your API from the latest docker image into a docker container available to you locally via port `8003` and will map to an exposed container port of `8000`. Please note that when developing, your local requests should be sent through port `8003`. This can be modified in the `docker-compose.yml` should you have need to change the host to container mapping.


When you are finished developing, you will want to stop running containers with the command:

```
npm run down
```
### Providing Google Sheet Information

  You will need the spreadsheet ID for the sheet you would like to access, and be authorized to view the sheet from your Google account. To find the sheet ID, you will want to first navigate to the given sheet and have a look at the URL.

~~https://docs.google.com/spreadsheets/d/~~**1ZfY2QZ4721_C3GKUuvC7S-qkK-reDoh_6YtD_ScvXzo**~~/edit#gid=0~~


  From that URL, you will need to copy the sheet ID in **bold** above and also the name of the specific tab you would like to project. Each spreadsheet defaults to Sheet1 upon creation. For the example above, the inputs to the Sheets widget form would look like:
  ```
  1ZfY2QZ4721_C3GKUuvC7S-qkK-reDoh_6YtD_ScvXzo
  Sheet1
  ```

### Testing

Testing and linting can all be done respectively with:

```
npm test
npm run lint
```
