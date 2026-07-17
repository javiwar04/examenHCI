/**
 * Google Apps Script para guardar resultados de los examenes
 * en una Hoja de Google (Google Sheets).
 *
 * PASOS:
 * 1. Crea una Hoja de Google nueva (sheets.new).
 * 2. Menu: Extensiones -> Apps Script.
 * 3. Borra lo que venga y pega TODO este archivo.
 * 4. Guarda. Luego: Implementar -> Nueva implementacion -> tipo "Aplicacion web".
 *      - Ejecutar como: Yo
 *      - Quien tiene acceso: Cualquier persona
 * 5. Copia la URL que termina en /exec y pegala en fase1.html y fase2.html
 *    (constante SHEETS_ENDPOINT).
 *
 * Las pestañas "Fase 1" y "Fase 2" se crean solas la primera vez.
 */
function doPost(e){
  try{
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = data.hoja || "Registros";
    var sheet = ss.getSheetByName(hoja);
    if(!sheet){ sheet = ss.insertSheet(hoja); }

    var fecha = new Date();
    var headers, fila;

    if(hoja === "Fase 1"){
      var resp = data.respuestas || [];
      headers = ["Fecha","Nombre","Punteo","Total","Nivel"];
      for(var i=0;i<resp.length;i++){ headers.push("P"+(i+1)); }
      fila = [fecha, data.nombre, data.punteo, data.total, data.nivel].concat(resp);
    } else { // Fase 2
      var comps = data.competencias || [];
      var respE = data.respuestasExamen || [];
      headers = ["Fecha","Nombre","Examen final","Aprobado","Relampago"];
      for(var j=0;j<comps.length;j++){ headers.push(comps[j].nombre); }
      for(var k=0;k<respE.length;k++){ headers.push("Examen P"+(k+1)); }
      fila = [fecha, data.nombre, data.examenFinal, data.aprobado, data.relampago];
      for(var j2=0;j2<comps.length;j2++){ fila.push(comps[j2].valor); }
      fila = fila.concat(respE);
    }

    if(sheet.getLastRow() === 0){ sheet.appendRow(headers); }
    sheet.appendRow(fila);

    return ContentService
      .createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService
      .createTextOutput(JSON.stringify({ok:false, error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
