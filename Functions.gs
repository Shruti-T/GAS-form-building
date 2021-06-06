//Updating my spreadsheet with new user data
function saveUserInput(userInfo)
{ 
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("form");
  
  const countDownDate = new Date("Nov 25, 2020 21:00:00").getTime();
  var now = new Date().getTime();
  var distance = countDownDate - now;
  
  //Logger.log(countDownDate);
  
  workSheet.appendRow([userInfo.FirstName,userInfo.LastName,userInfo.Modes,userInfo.zip,userInfo.est,userInfo.prefDate,new Date()]); 
}


//Calendar 
function getCalendarBusyDays()
{
  var startDate = new Date();
  var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));

  var calendar = CalendarApp.getCalendarsByName("form project")[0];
  var events = calendar.getEvents(startDate,endDate);
  
  var days = events.map(function(e){ return e.getStartTime().setHours(0,0,0,0); });
  var disabledDays = [];
  
  days.forEach(function(d){
    if(disabledDays.indexOf(d) === -1)
    {
      disabledDays.push(d);
    }
  });
  return disabledDays;
}


//Zip Code 
function findEstimate(zipCode)
{
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("Estimate");
  var data = workSheet.getRange(1,1,workSheet.getLastRow(),2).getValues();
  
  var zipCodeList = data.map(function(r) {return r[0];} );
  var estimateList = data.map(function(r) {return r[1];} );
    
  var position = zipCodeList.indexOf(zipCode);
  
  if(position > -1)
  {
    return "Rs." + estimateList[position].toFixed(2);
  }
  else
  {
    return "Unavailable";
  }
}