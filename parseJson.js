//example arg: /home/angel/SomMobilitat/Partago-app/Firebase/2017.12.17_som-mobilitat-dev-export_mod.json

process.argv.slice(2).forEach(function (fileName) {
        var n = fileName.lastIndexOf("."); //find the index of the extension
        var fileNameOut = fileName.substring(0, n);
        fileNameOut = fileNameOut.concat("_parseJson.json"); //add output name
        var fs = require('fs');
        var text = fs.readFileSync(fileName, "utf8");
        var obj = JSON.parse(text);

        //do something with the json model
        addConfigToAllPersons(obj);

        var myJSON = JSON.stringify(obj, null, 2);
        fs.writeFileSync(fileNameOut, myJSON, 'utf8');
        console.log(fileNameOut + " has been generated");
});

// add a config to each person using json parser in js
function addConfigToAllPersons(jsonObj) {
    //jsonObj.cars.car001.name = "hello";
    for (var key in jsonObj.persons)
    {
      for (var key2 in jsonObj.persons[key].groups){
        //console.log(jsonObj.persons[key].groups[key2].billingAccount);
        jsonObj.persons[key].groups[key2].config = "gl_mataro";
        //console.log(jsonObj.persons[key].groups[key2].config);
      }
    }
    return jsonObj;
}
