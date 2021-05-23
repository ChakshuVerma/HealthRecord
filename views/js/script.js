const canvas = document.getElementById('chart');
var ctx = canvas.getContext('2d');
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var myChart;

// Data Settings inside the chart
setchartdata = (dataset,LineColor,label) =>{
    let data = {
            label: label,
            data: dataset,
            fill: false,
            borderColor: LineColor,
            tension: 0.1,
        }
    return data;
}


// Chart Settings
setchartsettings = (data) => {
    myChart = new Chart(ctx,{
        type: 'line',
        data: data, 
        options: {
            label: {
                position: "right",
                align: "middle"
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    title: {
                        fontSize: '20',
                        text: 'Date',
                        color: 'Black',
                        display: true,
                    }
                },
                y: {
                    title: {
                        text: 'Value',
                        color: 'Black',
                        display: true,
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    backgroundColor: 'black',
                    hoverRadius: 10
                },
                line: {
                    borderWidth: 2
                }
            }
              
        }
    })
}


function showdata(event) {
    var button_id = event.target.id;
    var dataset = [], labels = [];
    var LineColor,data; 

    if(window.innerHeight > window.innerWidth){
        var databuttons = document.querySelectorAll('.databutton');
        for(let x = 0; x< databuttons.length; x++){
            databuttons[x].style.fontSize =  '4vw';
            databuttons[x].style.width = '35vw';
        }
    }

    if(button_id == 'button-Bp'){
        var dataset2 = [];
        var label2, LineColor2;

        for (var i = 0; i < localStorage.length; i++){
            labels.push(localStorage.key(i))
            var jsonString = localStorage.getItem(localStorage.key(i));
            var retrievedObject = JSON.parse(jsonString);
            var SysBP = findaverage(retrievedObject.SysBP);
            dataset.push(SysBP);
            var DiaBP = findaverage(retrievedObject.DiaBP);
            dataset2.push(DiaBP);
        }
        var label = 'Systolic BP'
        label2 = 'Diastolic BP'
        LineColor = 'blue'
        LineColor2 = 'red'

        var dataset1 = setchartdata(dataset, LineColor, label);
        var dataset2 = setchartdata(dataset2, LineColor2, label2);

        data = {
            labels: labels,
            datasets: [dataset1, dataset2]
        }
    }
    else if(button_id == 'button-SPO2'){
        for (var i = 0; i < localStorage.length; i++){
            labels.push(localStorage.key(i))
            var jsonString = localStorage.getItem(localStorage.key(i));
            var retrievedObject = JSON.parse(jsonString);
            var SPO2 = findaverage(retrievedObject.SPO2);
            dataset.push(SPO2);
        }
        var label = 'SPO2'
        LineColor = 'orange'

        var dataset1 = setchartdata(dataset, LineColor, label);
        data = {
            labels: labels,
            datasets: [dataset1]
        }
    }
    else if(button_id == 'button-Pulse'){
        for (var i = 0; i < localStorage.length; i++){
            labels.push(localStorage.key(i))
            var jsonString = localStorage.getItem(localStorage.key(i));
            var retrievedObject = JSON.parse(jsonString);
            var Pulse = findaverage(retrievedObject.Pulse);
            dataset.push(Pulse);
        }
        var label = 'Pulse'
        LineColor = 'green'

        var dataset1 = setchartdata(dataset, LineColor, label);
        data = {
            labels: labels,
            datasets: [dataset1]
        }
    }
    else{
        var dataset2 = [], dataset3 = [], dataset4 = [];

        for (var i = 0; i < localStorage.length; i++){
            labels.push(localStorage.key(i))
            var jsonString = localStorage.getItem(localStorage.key(i));
            var retrievedObject = JSON.parse(jsonString);
            var SysBP = findaverage(retrievedObject.SysBP);
            var DiaBP = findaverage(retrievedObject.DiaBP);
            var Pulse = findaverage(retrievedObject.Pulse);
            var SPO2 = findaverage(retrievedObject.SPO2);
            dataset.push(SysBP);
            dataset2.push(DiaBP);
            dataset3.push(SPO2);
            dataset4.push(Pulse);
        }
        var label1 = 'Diastolic BP', label2 = 'Systolic BP', label3 = 'SPO2', label4 = 'Pulse';
        var LineColor1 = 'blue', LineColor2 = 'red', LineColor3 = 'orange', LineColor4 = 'green';

        var dataset = setchartdata(dataset, LineColor1, label1);
        var dataset2 = setchartdata(dataset2, LineColor2, label2);
        var dataset3 = setchartdata(dataset3, LineColor3, label3);
        var dataset4 = setchartdata(dataset4, LineColor4, label4);
        
        data = {
            labels: labels,
            datasets: [dataset, dataset2, dataset3, dataset4]
        }
    }

    if(myChart !== undefined)
        myChart.destroy();
    
    document.querySelector('.canvas-container').style.display = 'flex';
    setchartsettings(data);
    myChart.update();
}


function deletealldata() {
    if(localStorage.length === 0){
        document.getElementById('msg').innerHTML = 'Nothing To Clear'
        document.getElementById('msg').className = 'alert alert-warning'
        document.getElementById('msg').style.display = 'block'
    }
    else{
        var response  = confirm(`Are you sure you want to delete all the data
Note: The deleted data cannot be recovered`)

        if(response === false){
            return;
        }
        else{
            for(key in localStorage){
                localStorage.removeItem(key);
            }
        
            document.getElementById('msg').innerHTML = 'Data Has Been Cleared'
            document.getElementById('msg').className = 'alert alert-success'
            document.getElementById('msg').style.display = 'block'
        }

        setTimeout(() => {
            location.reload()
        },2000);
    }

    setTimeout(() => {
        document.getElementById('msg').style.display = 'none'
    },3000)
}

function findaverage(dataObject){
    
    var value = dataObject.value;
    var count = dataObject.count;
    var average = value/count;

    return average;
}