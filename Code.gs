var url = "https://docs.google.com/spreadsheets/d/1lSQQYpuIHz2vZfmp-t7qwo84ewjmWOEOyFwQy3Z-CCQ/edit#gid=0";

//Calling Form Page From Home page.
function doGet(e)
{ 
  if(e.parameter.v == "form")
  {
    return loadForm();
  }
  else
  {
    return HtmlService.createTemplateFromFile("Home").evaluate();
  }
}

// To load the form page and My Modes Of Payment Options.
function loadForm(e)
{
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();

  var htmlListArray = list.map(function(r){ return "<option>"+ r[0] +"</option>";}).join("");

  var tmp = HtmlService.createTemplateFromFile("FormPage");
  tmp.list = htmlListArray;
  
  return tmp.evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}