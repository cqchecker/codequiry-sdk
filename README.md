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
Codequiry.account(function(data, err) {
	 if (!err) console.log(data);
    else console.log(err)
});
```
#### Getting checks
```javascript
Codequiry.checks(function(data, err) {
	 if (!err) console.log(data);
    else console.log(err)
});
```
#### Creating checks (specify name and programming language id)
Error with available languages: 
```
{
    "error": "Invalid programming language, must be a valid language ID",
    "available_languages": [
        {
            "id": 13,
            "language": "Java (.java)"
        },
        {
            "id": 14,
            "language": "Python (.py)"
        },
        {
            "id": 16,
            "language": "C (.c/.h)"
        },
        {
            "id": 17,
            "language": "C/C++ (.cc/.c/.h/.cpp/.hpp)"
        },
        {
            "id": 18,
            "language": "C# (.cs)"
        },
        {
            "id": 20,
            "language": "Perl (.pl/.sh)"
        },
        {
            "id": 21,
            "language": "PHP (.php)"
        },
        {
            "id": 22,
            "language": "SQL (.sql)"
        },
        {
            "id": 23,
            "language": "VB (.vb/.bas)"
        },
        {
            "id": 24,
            "language": "XML (.xml)"
        },
        {
            "id": 28,
            "language": "Haskell (.hs/.lhs)"
        },
        {
            "id": 29,
            "language": "Pascal (.pas/.inc)"
        },
        {
            "id": 30,
            "language": "Go (.go)"
        },
        {
            "id": 31,
            "language": "Matlab (.m)"
        },
        {
            "id": 32,
            "language": "Lisp (.el)"
        },
        {
            "id": 33,
            "language": "Ruby (.rb)"
        },
        {
            "id": 34,
            "language": "Assembly (.asm/.s)"
        },
        {
            "id": 38,
            "language": "HTML Javascript (.html/.htm/.xhtml)"
        },
        {
            "id": 39,
            "language": "Javascript (.js/.ts)"
        },
        {
            "id": 40,
            "language": "HTML (.html/.htm/.xhtml)"
        },
        {
            "id": 41,
            "language": "Plain Text/ASCII (.txt)"
        },
        {
            "id": 42,
            "language": "Plain Text by Character (.txt)"
        },
        {
            "id": 43,
            "language": "Swift (.swift)"
        },
        {
            "id": 44,
            "language": "Kotlin (.kt/.kts)"
        },
        {
            "id": 45,
            "language": "Yacc (.y,.yy,.ypp,.yxx)"
        },
        {
            "id": 46,
            "language": "Lex (.l,.ll)"
        },
        {
            "id": 47,
            "language": "Elixir (.ex, .exs)"
        },
        {
            "id": 48,
            "language": "Python Jupyter Notebook (.ipynb)"
        },
        {
            "id": 49,
            "language": "Dart (.dart)"
        }
    ]
}
```


```javascript
Codequiry.createCheck('CheckNameHere', '13', function(data, err) {
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
