var url = "https://docs.google.com/spreadsheets/d/1tEHSm0C2IDS_6rL3Motj-Q5SX_Sxx1ezJ11Ck26F5eE/edit#gid=0";

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


//Updating my spreadsheet with new user data
function saveUserInput(userInfo)
{ 
  
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("form");
  
  workSheet.appendRow([userInfo.FirstName,userInfo.LastName,userInfo.Modes,userInfo.zip,userInfo.est,userInfo.prefDate,new Date()]); 
}

// My Modes Of Payment Options.
function doGet(e)
{
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();

  var htmlListArray = list.map(function(r){ return "<option>"+ r[0] +"</option>";}).join("");

  var tmp = HtmlService.createTemplateFromFile("index");
  tmp.list = htmlListArray;
  
  return tmp.evaluate();
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






















