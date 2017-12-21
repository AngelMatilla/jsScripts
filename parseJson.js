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
    var token = 0;
    for (var key in jsonObj.persons)
    {
      for (var key2 in jsonObj.persons[key].groups){
        //console.log(jsonObj.persons[key].groups[key2].billingAccount);
        switch (key2){
          case "sommobilitat":
            if (token == 0){
                token = 1;
                jsonObj.persons[key].groups[key2].config = "gl_mataro";
            }
            break;
          case "gl_amposta":
            if (token == 0){
              token = 1;
              var new_element = {config:"gl_amposta", billingAccount:"sommobilitat"};
              jsonObj.persons[key].groups["sommobilitat"] = new_element;
            }
            delete jsonObj.persons[key].groups[key2];
            break;
          case "gl_bruc":
            if (token == 0){
              token = 1;
              var new_element = {config:"gl_bruc", billingAccount:"sommobilitat"};
              jsonObj.persons[key].groups["sommobilitat"] = new_element;
            }
            delete jsonObj.persons[key].groups[key2];
            break;
          case "gl_olot":
            if (token == 0){
              token = 1;
              var new_element = {config:"gl_olot", billingAccount:"sommobilitat"};
              console.log(jsonObj.persons[key].firstname);
              console.log(new_element);
              jsonObj.persons[key].groups["sommobilitat"] = new_element;
              console.log(jsonObj.persons[key].groups["sommobilitat"]);
            }
            delete jsonObj.persons[key].groups[key2];
            break;
          default:
            console.log(jsonObj.persons[key].firstname);
            console.log("this case should not exist");
            break;
        }
      }
      token = 0;
    }
    return jsonObj;
}
