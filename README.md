# Ourpoint Performance Testing

Script and test suite to run performance testing of Ourpoint project


## Installation

For Window, Install with [Node.js](https://nodejs.org/en) by running:

    npm install


## CD to folder test script

    cd .\k6\test\

## Run K6

    k6 run <filename.js>

filename :

 - **01_addPoint.js** : for adding points to members by Random shop and member from **shop.json**
 - **02_loadDashboard.js** : for load dashboard owner
 - **03_loginCRM.js** : for login CRM (member) by Random member from **userCRM.json**
 - **04_redeemCupon.js** : for test member redeem coupon

## Structure file

**config :** for config .env such as baseURL / key / api_version
**fixture :** data_test or payload
**support :** for support get token before run testing
**test :** file test script