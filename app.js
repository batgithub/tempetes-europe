
let file_to_read = 'tempetes.json' 
 
 function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file_to_read, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }




function init() {
    loadJSON(function(response) {
     // Parsing JSON string into object
       let tempetes = JSON.parse(response);
       for (const tempete of tempetes){
           console.log(tempete.Date.split('/')[0]);
       }
    });
}



init();

