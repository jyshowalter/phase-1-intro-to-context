// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3], 
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(array) {
    return array.map (employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, time){
    let [date, hour] = time.split(" ");
    employee.timeInEvents.push({
        type : "TimeIn",
        date : date,
        hour: parseInt(hour,10)
    })
     return employee;
}

function createTimeOutEvent(employee, time){
    let [date, hour] = time.split(" ");
    employee.timeOutEvents.push({
        type : "TimeOut",
        date : date,
        hour: parseInt(hour,10)
    })
     return employee;
}

function hoursWorkedOnDate(employee, date){
    const timeInEvent = employee.timeInEvents.find(e => e.date === date);
    const timeOutEvent = employee.timeOutEvents.find(e => e.date === date);

    const startingHour = timeInEvent.hour;
    const endingHour = timeOutEvent.hour;
    return (endingHour - startingHour)/100;
}

function wagesEarnedOnDate(employee,date){
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
}

function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(e => {
      return e.date;
    });
  
    let payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate(employee, d);
    }, 0);
  
    return payable;
  }


  function calculatePayroll(arrayTotal) {
    return arrayTotal.reduce(function (memo, rec) {
        return memo + allWagesFor(rec);
    }, 0)
  }