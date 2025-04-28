// Code.gs - File utama Google Apps Script
// Fungsi untuk menjalankan web app
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Chatbot Data Manager')
    .setFaviconUrl('https://www.gstatic.com/images/branding/product/2x/apps_script_48dp.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Fungsi untuk menyertakan file eksternal
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Fungsi untuk mendapatkan data dari spreadsheet
function getData() {
  try {
    // Dapatkan spreadsheet aktif
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Data Chatbot');
    
    // Jika sheet belum ada, buat sheet baru
    if (!sheet) {
      const newSheet = ss.insertSheet('Data Chatbot');
      // Tambahkan header
      newSheet.appendRow(['No', 'Keywords', 'Responses', 'Action Type', 'Action Value', 'Date Created']);
      // Format header
      newSheet.getRange('A1:F1').setBackground('#8ab4f8').setFontColor('white').setFontWeight('bold');
      return [];
    }
    
    // Dapatkan semua data
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Jika hanya ada header, kembalikan array kosong
    if (values.length <= 1) {
      return [];
    }
    
    // Filter header dan konversi data ke format yang dibutuhkan
    const data = [];
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      data.push({
        id: i,
        keywords: row[1].split(',').map(k => k.trim()),
        responses: row[2].split(',').map(r => r.trim()),
        actionType: row[3],
        actionValue: row[4],
        dateCreated: row[5]
      });
    }
    
    return data;
  } catch (error) {
    Logger.log(error);
    return { error: error.toString() };
  }
}

// Fungsi untuk menyimpan data ke spreadsheet
function saveData(data) {
  try {
    // Dapatkan spreadsheet aktif
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Data Chatbot');
    
    // Jika sheet belum ada, buat sheet baru
    if (!sheet) {
      sheet = ss.insertSheet('Data Chatbot');
      // Tambahkan header
      sheet.appendRow(['No', 'Keywords', 'Responses', 'Action Type', 'Action Value', 'Date Created']);
      // Format header
      sheet.getRange('A1:F1').setBackground('#8ab4f8').setFontColor('white').setFontWeight('bold');
    }
    
    // Siapkan data untuk disimpan
    const keywords = data.keywords.join(', ');
    const responses = data.responses.join(', ');
    const actionType = data.actionType || 'none';
    const actionValue = data.actionValue || '';
    const dateCreated = new Date().toLocaleString();
    
    // Jika ini adalah edit data
    if (data.id && data.id > 0) {
      // Update row yang sudah ada
      const rowIndex = data.id + 1; // +1 karena header ada di row 1
      sheet.getRange(rowIndex, 2).setValue(keywords);
      sheet.getRange(rowIndex, 3).setValue(responses);
      sheet.getRange(rowIndex, 4).setValue(actionType);
      sheet.getRange(rowIndex, 5).setValue(actionValue);
      return { success: true, message: 'Data berhasil diupdate!', id: data.id };
    } else {
      // Tambahkan row baru
      const lastRow = sheet.getLastRow();
      const newRow = lastRow + 1;
      sheet.getRange(newRow, 1).setValue(lastRow); // No urut
      sheet.getRange(newRow, 2).setValue(keywords);
      sheet.getRange(newRow, 3).setValue(responses);
      sheet.getRange(newRow, 4).setValue(actionType);
      sheet.getRange(newRow, 5).setValue(actionValue);
      sheet.getRange(newRow, 6).setValue(dateCreated);
      return { success: true, message: 'Data berhasil disimpan!', id: newRow - 1 };
    }
  } catch (error) {
    Logger.log(error);
    return { success: false, error: error.toString() };
  }
}

// Fungsi untuk menghapus data dari spreadsheet
function deleteData(id) {
  try {
    // Dapatkan spreadsheet aktif
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Data Chatbot');
    
    if (!sheet) {
      return { success: false, error: 'Sheet tidak ditemukan' };
    }
    
    // Hapus row berdasarkan ID
    const rowIndex = id + 1; // +1 karena header ada di row 1
    sheet.deleteRow(rowIndex);
    
    // Update nomor urut setelah penghapusan
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    for (let i = 1; i < values.length; i++) {
      sheet.getRange(i + 1, 1).setValue(i);
    }
    
    return { success: true, message: 'Data berhasil dihapus!' };
  } catch (error) {
    Logger.log(error);
    return { success: false, error: error.toString() };
  }
}

// Fungsi untuk menghapus semua data
function clearAllData() {
  try {
    // Dapatkan spreadsheet aktif
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Data Chatbot');
    
    if (!sheet) {
      return { success: false, error: 'Sheet tidak ditemukan' };
    }
    
    // Simpan header
    const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues();
    
    // Hapus sheet dan buat sheet baru dengan nama yang sama
    ss.deleteSheet(sheet);
    const newSheet = ss.insertSheet('Data Chatbot');
    
    // Tambahkan kembali header
    newSheet.getRange(1, 1, 1, header[0].length).setValues(header);
    
    // Format header
    newSheet.getRange('A1:F1').setBackground('#8ab4f8').setFontColor('white').setFontWeight('bold');
    
    return { success: true, message: 'Semua data berhasil dihapus!' };
  } catch (error) {
    Logger.log(error);
    return { success: false, error: error.toString() };
  }
}

// Fungsi untuk generate JavaScript file
function generateJavaScriptData() {
  try {
    // Dapatkan data dari spreadsheet
    const data = getData();
    
    if (data.length === 0) {
      return { success: false, error: 'Tidak ada data untuk diekspor!' };
    }
    
    // Format data untuk JavaScript
    let jsCode = '// datachatbot.js\nconst chatbotData = [\n';
    
    data.forEach((item, index) => {
      jsCode += '  {\n';
      jsCode += `    keywords: [${item.keywords.map(k => `"${k}"`).join(', ')}],\n`;
      jsCode += `    responses: [${item.responses.map(r => `"${r.replace(/"/g, '\\"')}"`).join(', ')}],\n`;
      
      if (item.actionType === 'url') {
        jsCode += `    action: function() {\n      window.open("${item.actionValue.replace(/"/g, '\\"')}", "_blank");\n    }`;
      }
      
      jsCode += '\n  }';
      if (index < data.length - 1) jsCode += ',';
      jsCode += '\n';
    });
    
    jsCode += '];\n\n// Export supaya bisa dipakai file lain\n// (Kalau di browser biasa cukup <script src="datachatbot.js">)';
    
    return { success: true, code: jsCode };
  } catch (error) {
    Logger.log(error);
    return { success: false, error: error.toString() };
  }
}