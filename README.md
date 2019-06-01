## NodeJS Wrapper for Codequiry API 

Codequiry is a commercial grade plagiarism and similarity detection software for source code files. Submissions are checked with billions of sources on the web as well as checked locally against provided submissions. This is a NodeJS example application for the API to check code plagiarism and similarity.

The API allows us to run multiple different tests on source code files: 
1. Peer Check - Given a group of submissions as individual zip files, all lines of code are compared to each other and relative similarity scores are computed, as well as matched snippets. 
2. Database Check - Checks submissions against popular repositories and public sources of code.
3. Web Check - Does a full check of code with over 2 billion public sources on the web. 

Checks return us tons of data such as similarity scores, individual file scores, cluster graphs, similarity histograms, highlights results, matched snippets, percentage plagiarised and similar, and a ton more... 

Main Website: 
https://codequiry.com

API Docs:
https://codequiry.com/usage/api

### Installation

`npm install codequiry`
