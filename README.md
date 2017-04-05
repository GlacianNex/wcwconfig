# WCWConfig

This library is used as a helper to configure winston and winston-cloudwatch to work together.

## Motivation

Core driving factor here was that I write a lot of lambdas that require some form of customized logging to CloudWatch. I really liked winston-cloudwatch library but having to copy-paste code from project to project got annoying.

I wrote this tiny utility library that makes it very simply to configure your winston.

If you write a lot of lambdas and want to aggrigate their output into custom log groups on CloudWatch based on a timestamp this libary does exactly that.

## Usage

Library permits you to specify the following attributes:
* logGroupName - name of the log group you want to create (required)
* level - log level (defaults to info)
* awsRegion - CloudWatch AWS region where logs will be sent. If none specified it will default to `process.env.AWS_DEFAULT_REGION`, which in case of lambda is your current region.
* timeFormat - the format used to display time of timestamp (moment-timezone)
* timezone - timezone code that will be used to generate timestamp (moment-timezone)

This will take logs you write with winston and send them to the CloudWatch. The log group is specified by you, the streams will be in a format of a date that you set via the arguments. 

``` js
exports.handler = (event, context, callback) => {
    var wcwconfig = require('wcwconfig');
    const tracker = wcwconfig.init('group', 'info', 'us-east-1', 'yyyy-mm-dd hh:00', 'UTC');

    const winston = require('winston);
    winston.info('hello world');

    tracker.kthxbye(() => callback())
}
```

