createDataArray = () => {
    var  dataArray = ['Health-Record'];         //This is some temporary data
    var  dataString = JSON.stringify(dataArray);
    localStorage.setItem('DataArray', dataString);
}

function adddata(event) {
    if(localStorage.getItem('DataArray') === null)
        createDataArray();

    let SysBP = document.getElementById('BP-1').value;
    let DiaBP = document.getElementById('BP-2').value;
    let SPO2 = document.getElementById('SPO2').value;
    let Pulse = document.getElementById('Pulse').value;
    let msg = document.getElementById('msg')

    if((SysBP != '' && isNaN(SysBP)) || (DiaBP != '' && isNaN(DiaBP)) || (Pulse != '' && isNaN(Pulse)) || (SPO2 != '' && isNaN(SPO2))){
        msg.innerHTML = 'Insert Only Numbers Please';
            msg.className = 'alert alert-warning'
            msg.style.display = 'block'
            setTimeout(() => {
                msg.style.display = 'none'
            },2000)
    }
    else{
        if(SysBP == '')
            SysBP = NaN;
        if(DiaBP == '')
            DiaBP = NaN;
        if(Pulse == '')
            Pulse = NaN;
        if(SPO2 == '')
            SPO2 = NaN;
        
        if(isNaN(SysBP) && isNaN(DiaBP) && isNaN(Pulse) && isNaN(SPO2)) {
            msg.innerHTML = 'Add atleast one reading';
            msg.className = 'alert alert-warning'
            msg.style.display = 'block'
            setTimeout(() => {
                msg.style.display = 'none'
            },2000)
        }
        else{
            if(((SysBP<115 || SysBP>139) && SysBP!=NaN) || ((DiaBP<75 || DiaBP>95)&& DiaBP!=NaN) || ((Pulse<57 || Pulse>105) && Pulse!=NaN) || ((SPO2<92 || SPO2>100) && SPO2!=NaN)){
                msg.className = 'alert alert-danger'
                msg.innerHTML = 'Your Readings Are Extreme. You Should Visit A Hospital Immediately'
                msg.style.display = 'block'
            }
            else{
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                today = String(dd) + '/' + String(mm);
            
                var returnedArray = returnDataObject(SysBP,DiaBP,Pulse,SPO2,today);
                var obj = returnedArray[0];
                var pushNewObject = returnedArray[1];

                addToLocalStorage(obj, pushNewObject);
            
                msg.className = 'alert alert-success'
                msg.innerHTML = 'Readings Added'
                msg.style.display = 'block'

                document.getElementById('BP-1').value = ''
                document.getElementById('BP-2').value = ''
                document.getElementById('Pulse').value = ''
                document.getElementById('SPO2').value = ''
            }
            setTimeout(() => {
                msg.style.display = 'none'
            },2000)
        }
    }
}


function addToLocalStorage(data, pushNewObject) {
    var tempDataString = localStorage.getItem('DataArray');
    var tempDataArray = JSON.parse(tempDataString);

    if(pushNewObject === true)
        tempDataArray.push(data);
    else
        tempDataArray[tempDataArray.length - 1] = data;

    tempDataString = JSON.stringify(tempDataArray);
    localStorage.setItem('DataArray', tempDataString);
}

function returnDataObject(SysBP,DiaBP,Pulse,SPO2,today) {
    let tempDataString = localStorage.getItem('DataArray');
    let tempDataArray = JSON.parse(tempDataString);
    let arrayLength = tempDataArray.length;

    if(arrayLength===1 || tempDataArray[arrayLength-1].date !== today){
        var count1=1, count2=1, count3=1, count4=1;
        if(isNaN(SysBP))
            count1 = 0;
        if(isNaN(DiaBP))
            count2 = 0;
        if(isNaN(Pulse))
            count3 = 0;
        if(isNaN(SPO2))
            count4 = 0;
        
        var obj = {
            date: today,
            SysBP: {value: SysBP, count:count1},
            DiaBP: {value: DiaBP, count:count2},
            Pulse: {value: Pulse, count:count3},
            SPO2:  {value: SPO2, count:count4}
        }
        return [obj, true];
    }
    else{
        var retrievedObject = tempDataArray[arrayLength-1];

        if(isNaN(DiaBP))
            retrievedObject.DiaBP.value = parseFloat(retrievedObject.DiaBP.value)
        else if(isNaN(parseFloat(retrievedObject.DiaBP.value))){
            retrievedObject.DiaBP.value = parseFloat(DiaBP);
            retrievedObject.DiaBP.count ++;
        }
        else{
            retrievedObject.DiaBP.value = parseFloat(retrievedObject.DiaBP.value) + parseFloat(DiaBP);
            retrievedObject.DiaBP.count ++;
        }
         
        if(isNaN(SysBP))
            retrievedObject.SysBP.value = parseFloat(retrievedObject.SysBP.value)
        else if(isNaN(parseFloat(retrievedObject.SysBP.value))){
            retrievedObject.SysBP.value = parseFloat(SysBP);
            retrievedObject.SysBP.count ++;
        }
        else{
            retrievedObject.SysBP.value = parseFloat(retrievedObject.SysBP.value) + parseFloat(SysBP);
            retrievedObject.SysBP.count ++;
        }
        
        if(isNaN(Pulse))
            retrievedObject.Pulse.value = parseFloat(retrievedObject.Pulse.value)
        else if(isNaN(parseFloat(retrievedObject.Pulse.value))){
            retrievedObject.Pulse.value = parseFloat(Pulse);
            retrievedObject.Pulse.count ++;
        }
        else{
            retrievedObject.Pulse.value = parseFloat(retrievedObject.Pulse.value) + parseFloat(Pulse);
            retrievedObject.Pulse.count ++;
        }

        if(isNaN(SPO2))
            retrievedObject.SPO2.value = parseFloat(retrievedObject.SPO2.value)
        else if(isNaN(parseFloat(retrievedObject.SPO2.value))){
            retrievedObject.SPO2.value = parseFloat(SPO2);
            retrievedObject.SPO2.count ++;
        }
        else{
            retrievedObject.SPO2.value = parseFloat(retrievedObject.SPO2.value) + parseFloat(SPO2);
            retrievedObject.SPO2.count ++;
        }
        return [retrievedObject, false];
    }
}

function deletetodaydata() {

    let msg = document.getElementById('msg')
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    today = String(dd) + '/' + String(mm);

    if(localStorage.getItem('DataArray') === null){
        msg.innerHTML = 'No Data Found' + '<br/>' + 'Enter Some Data First'
        msg.className = 'alert alert-warning'
        msg.style.display = 'block'
        setTimeout(() => {
            msg.style.display = 'none'
        },2000)
    }

    let tempDataString = localStorage.getItem('DataArray');
    let tempDataArray = JSON.parse(tempDataString);
    let arrayLength = tempDataArray.length;
    var retrievedObject = tempDataArray[arrayLength-1];

    if (arrayLength===1 || tempDataArray[arrayLength-1].date !== today) {
        msg.innerHTML = "No Readings Were Entered Today";
        msg.className = 'alert alert-warning'
        msg.style.display = 'block'
        setTimeout(() => {
            msg.style.display = 'none'
        },2000)
    }
    else{
        var response  = confirm(`Are you sure you want to delete today's data
Note: The deleted data cannot be recovered`)

        if(response === false)
        {
            msg.innerHTML = "Operation Cancelled";
            msg.className = 'alert alert-success'
        }
        else{
            tempDataArray.pop();
            tempDataString = JSON.stringify(tempDataArray);
            localStorage.setItem('DataArray', tempDataString);  
            msg.innerHTML = "Today's Data Deleted";
            msg.className = 'alert alert-success'
        }
        msg.style.display = 'block'
        setTimeout(() => {
            msg.style.display = 'none'
        },2000)
    }
}