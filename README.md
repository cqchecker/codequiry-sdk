# NodeJS SDK for Codequiry API 

Codequiry is a commercial grade plagiarism and similarity detection software for source code files. Submissions are checked with billions of sources on the web as well as checked locally against provided submissions. This is a NodeJS example application for the API to check code plagiarism and similarity.

The API allows us to run multiple different tests on source code files: 
1. Peer Check - Given a group of submissions as individual zip files, all lines of code are compared to each other and relative similarity scores are computed, as well as matched snippets. 
2. Database Check - Checks submissions against popular repositories and public sources of code.
3. Web Check - Does a full check of code with over 2 billion public sources on the web. 

Checks return us tons of data such as similarity scores, individual file scores, cluster graphs, similarity histograms, highlights results, matched snippets, percentage plagiarised and similar, and a ton more... 

Main Website: 
https://codequiry.com

Full API Docs:
https://codequiry.com/usage/api

## Installation

```
npm install codequiry
```
#### Initializing
```
var Codequiry = require('codequiry')
```

#### Setting your API Key
```
Codequiry.setAPIKey('YOUR_API_KEY')
```
## Usage
#### Getting account information
```javascript
Codequiry.account(function(data, err)) {
	 if (!err) console.log(data);
    else console.log(err)
});
```
#### Getting checks
```javascript
Codequiry.checks(function(data, err)) {
	 if (!err) console.log(data);
    else console.log(err)
});
```
#### Creating checks (specify name and programming language)
Examples: java, c-cpp, python, csharp, txt
```javascript
Codequiry.createCheck('CheckNameHere', 'java', function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
#### Uploading to a check (specify check_id and file (must be a zip file)) 
```javascript
Codequiry.uploadFile(CHECK_ID, './test.zip', function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
#### Starting a check (specify check_id and if running database check or web check) 
```javascript
Codequiry.startCheck(CHECK_ID, false, false, function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
#### Getting a check information/status
```javascript
Codequiry.getCheck(CHECK_ID, function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
#### Getting results overview
```javascript
Codequiry.getOverview(CHECK_ID, function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
#### Getting specific results of a submission
```javascript
Codequiry.getResults(CHECK_ID, SUBMISSION_ID function(data, err) {
    if (!err) console.log(data);
    else console.log(err)
});
```
## Realtime checking progress - SocketIO
This is an example of the listener, you can call this after getting a check status or after starting a check (both will reutrn a job ID, which you can listen to). Here we will listen to specific CHECK_ID.
```javascript
Codequiry.getCheck(CHECK_ID, function(data) {
    console.log(data.check.job_id);
    Codequiry.checkListen(data.check.job_id);
    Codequiry.emitter.on('update', function(data) {
        console.log(data);
    });
});
```
