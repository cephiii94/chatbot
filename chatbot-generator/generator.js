function convertCSV() {
  const fileInput = document.getElementById('uploadCSV');
  const output = document.getElementById('output');

  if (!fileInput.files.length) {
    alert("Pilih file CSV dulu ya!");
    return;
  }

  Papa.parse(fileInput.files[0], {
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
      const data = results.data;
      let chatbotData = [];

      data.forEach(row => {
        const keywords = row.Keywords.split(',').map(k => k.trim());
        const responses = row.Responses.split('|').map(r => r.trim());

        chatbotData.push({ keywords, responses });
      });

      const outputText = "const chatbotData = " + JSON.stringify(chatbotData, null, 2) + ";";
      output.value = outputText;
    }
  });
}