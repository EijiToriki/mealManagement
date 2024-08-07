const end_row = get_lastRow("料理登録マスター", "D")   // 料理登録マスターシート D列の最終行
const month = (new Date()).getMonth() + 1;            // 今日の「月」
const day = (new Date()).getDate();                   // 今日の「日」



function main() {
  writeIfEmpty("料理登録マスター", "A", 1, month)     // A列に「月」を転記
  writeIfEmpty("料理登録マスター", "B", 2, day)     // B列に「日」を転記

  const dataObject = summaryByDay("料理登録マスター")
  writeSummary(dataObject)
  
}


function get_lastRow(sheetName, colName){
  // ある列のデータが入っている最終行を返す関数
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  var column = sheet.getRange(`${colName}:${colName}`);
  var values = column.getValues();
  
  var lastRow = 0;
  for (var i = values.length - 1; i >= 0; i--) {
    if (values[i][0] !== "") {
      lastRow = i + 1; // 行番号は1から始まるので+1
      break;
    }
  }

  return lastRow;
}


function writeIfEmpty(sheetName, colName, colNum, writeValue) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);
  
  var range = sheet.getRange(`${colName}1:${colName}${end_row}`);
  var values = range.getValues();
    
  for (var i = 0; i < end_row; i++) {
    if (values[i][0] === "") {
      sheet.getRange(i + 1, colNum).setValue(writeValue); // i+1で行番号、1で列Aを指す
    }
  }
}


function summaryByDay(sheetName){
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  var rangeA = sheet.getRange(`A2:A${end_row}`);
  var rangeB = sheet.getRange(`B2:B${end_row}`);
  var rangeE = sheet.getRange(`E2:E${end_row}`);
  var rangeF = sheet.getRange(`F2:F${end_row}`);
  var rangeG = sheet.getRange(`G2:G${end_row}`);
  var rangeH = sheet.getRange(`H2:H${end_row}`);
  var rangeI = sheet.getRange(`I2:I${end_row}`);

  var valuesA = rangeA.getValues();
  var valuesB = rangeB.getValues();
  var valuesE = rangeE.getValues();
  var valuesF = rangeF.getValues();
  var valuesG = rangeG.getValues();
  var valuesH = rangeH.getValues();
  var valuesI = rangeI.getValues();

  const dataObject = {}
  for(var i=0; i < end_row-1; i++){
    if(!(valuesA[i] in dataObject)){
      dataObject[valuesA[i]] = {}
    }
    if(!(valuesB[i] in dataObject[valuesA[i]])){
      dataObject[valuesA[i]][valuesB[i]] = {
        "熱量" : Number(valuesE[i]),
        "タンパク質" : Number(valuesF[i]),
        "脂質" : Number(valuesG[i]),
        "炭水化物" : Number(valuesH[i]),
        "食塩相当量" : Number(valuesI[i]),
      }
    }else{
      dataObject[valuesA[i]][valuesB[i]]["熱量"] += Number(valuesE[i])
      dataObject[valuesA[i]][valuesB[i]]["タンパク質"] += Number(valuesF[i])
      dataObject[valuesA[i]][valuesB[i]]["脂質"] += Number(valuesG[i])
      dataObject[valuesA[i]][valuesB[i]]["炭水化物"] += Number(valuesH[i])
      dataObject[valuesA[i]][valuesB[i]]["食塩相当量"] += Number(valuesI[i])
    }
  }

  return dataObject
}


function writeSummary(dataObject){
  for(const month in dataObject){
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName(`${month}月_集計`);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }

    let row_num = 1
    for(const day in dataObject[month]){
      row_num += 1
      var range = sheet.getRange(row_num, 1, 1, 7)
      var writeValue = [
        month, day, 
        roundToSecondDecimalPlace(dataObject[month][day]["熱量"]), 
        roundToSecondDecimalPlace(dataObject[month][day]["タンパク質"]), 
        roundToSecondDecimalPlace(dataObject[month][day]["脂質"]), 
        roundToSecondDecimalPlace(dataObject[month][day]["炭水化物"]), 
        roundToSecondDecimalPlace(dataObject[month][day]["食塩相当量"])
      ]
      range.setValues([writeValue])
    }
  }
}


function roundToSecondDecimalPlace(num) {
  return num.toFixed(2);
}



