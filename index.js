'use strict';

const moment = require('moment-timezone');

class WCWConfig {
    static init(logGroupName, level, awsRegion, timeFormat, timezone) {
        const winston = require('winston');
        const CloudWatch = require('winston-cloudwatch');

        const cloudWatchTracker = new CloudWatch({
            logGroupName,
            logStreamName: moment().tz(timezone).format(timeFormat),
            awsRegion: process.env.AWS_DEFAULT_REGION || awsRegion,
            level
        });

        winston.configure({
            transports: [
                new winston.transports.Console({
                    level
                }),
                cloudWatchTracker
            ]
        });

        return cloudWatchTracker;
    }
}

module.exports = WCWConfig;