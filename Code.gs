function doGet()
{
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function newClicked(userInfo)
{ 
  var url = "https://docs.google.com/spreadsheets/d/1tEHSm0C2IDS_6rL3Motj-Q5SX_Sxx1ezJ11Ck26F5eE/edit#gid=0";
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = SpreadSheet.getSheetByName("JAN");
  
  workSheet.appendRow([userInfo.FirstName,userInfo.LastName,userInfo.App,new Date()]); 
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


