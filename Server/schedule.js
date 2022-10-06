const schedule = require('node-schedule');

// 可以按照cron的格式设置
function runSchedule (cb) {
    schedule.scheduleJob('0 * * * * *', function () {
        console.log('定时任务执行一次');
        cb && cb();
    });
}

module.exports = runSchedule;