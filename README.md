# NBRM-kurs
Simple React app pulling currency data from NBRM / National Bank of Republic of Macedonia

## API
`http://www.nbrm.mk/services/ExchangeRates.asmx/GetEXRates`<br>
Terrible XML API but yet, gets the job done...

### CORS workaround
Shout out to the CORS issue workaround [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/)<br>
Whole API link in code `https://cors-anywhere.herokuapp.com/http://www.nbrm.mk/services/ExchangeRates.asmx/GetEXRates`

## Running the app
`npm start` - Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.