# GF affection lights frontend

This is the frontend of the gf affection lights.
It displays a light bulb and on click it sends an API request to the [gf affection lights backend](https://github.com/jones1008/gf-affection-lights-backend) that is configured via the env variable `REACT_APP_BACKEND_URL`. You need to set this in the `.env` file. 

```bash
npm start
```


Runs the app in the development mode.\
Open [http://localhost:1206](http://localhost:1206) to view it in the browser.

To bundle the application and build it to the `build` folder run:
```bash
npm run build
```

Then you want to serve that build folder from a webserver.
