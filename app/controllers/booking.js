const express = require('express');
const path = require('path');
const app = express();
const message = require('../../helpers/messages');
const codes = require('../../helpers/codes');
const moment = require('moment-timezone');


class bookingService {
    // slots
    async BookingSlots(req, res) {
        try {
            var messages = message.messages(req.header('language'));
            var timezone = req.header('timezone') ? req.header('timezone') : 'asia/kolkata';
            // var userId = req.obj.result.userId;
            var req_data = req.body;
            if (!req_data.serviceTime || !req_data.bookingDate) {
                return res.json({ code: codes.badRequest, message: messages.BadRequest });
            }
            var workingHours = {
                Monday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Tuesday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Wednesday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Thursday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Friday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Saturday:{
                    openTiming:"09:00 AM",
                    closeTiming:"05:00 PM"
                },
                Sunday:{
                    openTiming:"closed",
                    closeTiming:"closed"
                }
            }
            if (workingHours) {
                var day = moment(req_data.bookingDate).format('dddd');
                var workingHourData = workingHours[day];
                if (workingHourData.openTiming != 'closed') {
                    var a = [];

                    var serviceTime = req_data.serviceTime;
                    var openingTime = workingHourData.openTiming;
                    var closingTime = workingHourData.closeTiming;
                    var startTime = moment(openingTime, 'hh:mm A');
                    var endTime = moment(closingTime, 'hh:mm A').subtract(60, 'minutes');
                    var et = new moment(endTime, 'hh:mm A');
                    var timeSlots = [];
                    var slTime = moment().add(1, 'Hours').tz(timezone).format('hh:mm A'); // current time
                    var todayDate = new moment().format('YYYY-MM-DD');
                    while (startTime <= endTime) {
                        if (a && a.length) {
                            for (var i = 0; i < a.length; i++) {
                                var x = a;
                                var y = moment(startTime, 'hh:mm A');
                                y.add(serviceTime, 'minutes');
                                var s = moment(x[i].time, 'hh:mm A');
                                if (s < y && s >= startTime) {
                                    s.add(x[i].serviceTime1, 'minutes');
                                    startTime = moment(s, 'hh:mm A')
                                    x.splice(0, a[i].time);
                                }
                            }
                            timeSlots.push(new moment(startTime).format('hh:mm A'));
                            startTime.add(serviceTime, 'minutes');
                        } else {
                            timeSlots.push(new moment(startTime).format('hh:mm A'));
                            startTime.add(serviceTime, 'minutes');
                        }
                    }

                    var resArr = [];
                    if (todayDate == req.body.bookingDate) {
                        for (var i = 0; i < timeSlots.length; i++) {
                            var startTime1 = moment(timeSlots[i], 'hh:mm A');
                            var slTime1 = moment(slTime, 'hh:mm A');
                            if (startTime1 >= slTime1) {
                                resArr.push(timeSlots[i]);
                            }
                        }
                    } else {
                        var resArr = timeSlots;
                    }
                    var startTime2 = moment(timeSlots[0], 'hh:mm A');
                    if (startTime2 <= et) {
                        resArr = resArr;
                    } else {
                        resArr = [];
                    }
                    return res.json({ code: codes.success, message: messages.success, result: resArr });
                } else {
                    res.json({ code: codes.badRequest, message: messages.BookOnHoliday });
                }
            } else {
                return res.json({ code: codes.badRequest, message: messages.BookOnHoliday })
            }
        } catch (error) {
            console.log(error);
            return res.json({ code: codes.serverError, message: messages.serverError });
        }
    }
}


module.exports = bookingService;