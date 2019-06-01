const axios = require('axios');
var api_key;
var request = require('request');
var fs = require('fs');
var events = require('events');
var io = require('socket.io-client');
var em = new events.EventEmitter();
exports.checkListen = function(job_id) {
    var socket = io('https://api.codequiry.com/');
    if (job_id != 0) {
        socket.emit('job-check', {
            jobid: job_id
        });
        socket.on('job-status', function(data) {
            em.emit('update', data);
            if (data.error == 1 || data.percent == 100) {
                socket.disconnect();
            }
        });
    }
};
exports.emitter = em;
exports.setAPIKey = function(api) {
    api_key = api;
};
// Other stuff...
exports.account = function(callback) {
    runner('account', {}, function(data, err) {
        callback(data, err)
    });
};
exports.checks = function(callback) {
    runner('checks', {}, function(data, err) {
        callback(data, err)
    });
};
exports.createCheck = function(checkname, lang, callback) {
    runner('check/create', {
        name: checkname,
        language: lang
    }, function(data, err) {
        callback(data, err)
    });
};
exports.startCheck = function(checkid, db, web, callback) {
    if (db) db = 1
    if (web) web = 1
    runner('check/start', {
        check_id: checkid,
        webcheck: web,
        dbcheck: db
    }, function(data, err) {
        callback(data, err)
    });
};
exports.uploadFile = function(checkid, filein, callback) {
    var params = {
        check_id: checkid,
        file: fs.createReadStream(filein)
    };
    var headersWebex = {
        "Access-Control-Allow-Origin": "*",
        'apikey': api_key,
        'Content-Type': 'multipart/form-data'
    }
    request.post({
        headers: headersWebex,
        url: 'https://codequiry.com/api/v1/check/upload',
        method: 'POST',
        formData: params
    }, function(error, response, body) {
        if (error) callback(null, error)
        if (JSON.parse(body).error) {
            callback(null, JSON.parse(body).error)
        } else {
            callback(JSON.parse(body));
        }
    });
};
exports.getCheck = function(checkid, callback) {
    runner('check/get', {
        check_id: checkid
    }, function(data, err) {
        callback(data, err)
    });
};
exports.getOverview = function(checkid, callback) {
    runner('check/overview', {
        check_id: checkid
    }, function(data, err) {
        callback(data, err)
    });
};
exports.getResults = function(checkid, sid, callback) {
    runner('check/results', {
        check_id: checkid,
        submission_id: sid
    }, function(data, err) {
        callback(data, err)
    });
};

function runner(route, postdata, callback) {
    if (api_key != null) {
        var postData = postdata;
        var contentType;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'apikey': api_key,
            }
        };
        axios.post('https://codequiry.com/api/v1/' + route, postData, axiosConfig).then((res) => {
            if (res.data.error) {
                callback(null, res.data.error)
            } else {
                callback(res.data)
            }
        }).catch((err) => {
            callback(null, err.response.data.error);
        })
    } else {
        callback(null, 'No API Key was set');
    }
};