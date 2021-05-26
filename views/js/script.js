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
            backgroundColor: LineColor
        }
    return data;
}


// Chart Settings
setchartsettings = (data) => {
    myChart = new Chart(ctx,{
        type: 'line',
        data: data, 
        options: {
            plugins: {
                legend:{
                    display: true,
                    align: "middle",
                    labels: {
                        usePointStyle: true,
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    title: {
                        text: 'Date',
                        color: 'Black',
                        display: true,
                        font: {
                            size: 20
                        }
                    }
                },
                y: {
                    title: {
                        text: 'Reading',
                        color: 'Black',
                        display: true,
                        font: {
                            size: 20
                        }
                    },
                    suggestedMin: 0,
                }
            },
            elements: {
                point: {
                    radius: 4,
                    backgroundColor: 'black',
                    hoverRadius: 10
                },
                line: {
                    borderWidth: 2,
                    tension: 0.1,
                    spanGaps: true
                }
            }
              
        }
    })

}

function showdata(event) {
    if(localStorage.getItem('DataArray') === null || JSON.parse(localStorage.getItem('DataArray')).length === 1){
        document.getElementById('msg').innerHTML = 'No Data Found' + '<br/>' + 'Enter Some Data First'
        document.getElementById('msg').className = 'alert alert-warning'

        document.getElementById('msg').style.display = 'block';
        setTimeout(() => {
            document.getElementById('msg').style.display = 'none'
        },3000)
    }
    else{
        var button_id = event.target.id;
        var dataset = [], labels = [];
        var LineColor,data; 
        let tempDataString = localStorage.getItem('DataArray');
        let tempDataArray = JSON.parse(tempDataString);

        if(window.innerHeight > window.innerWidth){
            var databuttons = document.querySelectorAll('.databutton');
            for(let x = 0; x< databuttons.length; x++){
                databuttons[x].style.fontSize =  '4vw';
                databuttons[x].style.width = '35vw';
            }
        }

        if(button_id == 'button-Bp'){
            var dataset2 = [];

            for(var i=1; i<tempDataArray.length; i++){
                var obj = tempDataArray[i];
                labels.push(obj.date)
                var SysBP = findaverage(obj.SysBP);
                dataset.push(SysBP);
                var DiaBP = findaverage(obj.DiaBP);
                dataset2.push(DiaBP);
            }

            var label = 'Systolic BP',
            label2 = 'Diastolic BP',
            LineColor = 'blue',
            LineColor2 = 'red'

            var dataset1 = setchartdata(dataset, LineColor, label);
            var dataset2 = setchartdata(dataset2, LineColor2, label2);

            data = {
                labels: labels,
                datasets: [dataset1, dataset2]
            }
        }
        else if(button_id == 'button-SPO2'){
            for(var i=1; i<tempDataArray.length; i++){
                var obj = tempDataArray[i];
                labels.push(obj.date)
                var SPO2 = findaverage(obj.SPO2);
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
            for(var i=1; i<tempDataArray.length; i++){
                var obj = tempDataArray[i];
                labels.push(obj.date)
                var Pulse = findaverage(obj.Pulse);
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
           for(var i=1; i<tempDataArray.length; i++){
                var obj = tempDataArray[i];
                labels.push(obj.date)
                var SysBP = findaverage(obj.SysBP);
                var DiaBP = findaverage(obj.DiaBP);
                var Pulse = findaverage(obj.Pulse);
                var SPO2 = findaverage(obj.SPO2);
                dataset.push(SysBP);
                dataset2.push(DiaBP);
                dataset3.push(SPO2);
                dataset4.push(Pulse);
            }

            var label1 = 'Systolic BP', label2 = 'Diastolic BP', label3 = 'SPO2', label4 = 'Pulse';
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
}


function deletealldata() {

    if(localStorage.getItem('DataArray') === null){
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
            localStorage.removeItem('DataArray');
           
            document.getElementById('msg').innerHTML = 'Data Has Been Cleared'
            document.getElementById('msg').className = 'alert alert-success'
            document.getElementById('msg').style.display = 'block'
        }

        setTimeout(() => {
            location.reload()
        },500);
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