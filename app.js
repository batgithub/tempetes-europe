
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



function get_array_of_years(starting_year, ending_year){
    let start_date = new Date(starting_year)
    let end_date = new Date(ending_year)
    array_of_years = []
    let dt = new Date(starting_year);
   
     while (dt <= new Date(ending_year)) {
        array_of_years.push(new Date(dt).getFullYear());
        dt.setFullYear(dt.getFullYear() + 1);
    }



    return array_of_years

}


function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }


function get_number_in_array(value, arr){
    

}



function init() {
    loadJSON(function(response) {
        // Parsing JSON string into object
        let tempetes = JSON.parse(response);
        let tempetes_date_parsed = []
        let array_of_years = get_array_of_years('1953', '2020')
      
        for (const tempete of tempetes){
                tempetes_date_parsed.push({Name:tempete.Name, Date: new Date(tempete.Date).getFullYear(), ressource:tempete.Ressource})           
        }

        let tempetes_number_by_year = groupBy(tempetes_date_parsed, 'Date')

        let tempetes_number_by_year_filled = array_of_years.map( year =>{
            return tempetes_number_by_year[year] 
        })

        let datas = []
        for (const year of tempetes_number_by_year_filled) {
            if(year !== undefined){
                datas.push(year.length)
                
            }else {
                datas.push(0)
            }
        }

       
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: array_of_years,
                datasets: [{
                    label: 'Nombre de tempètes entre 1953 et 2020',
                    data: datas,
                    
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });


       console.log(datas);
    });
}



init();


