function adddata(event) {
    let SysBP = document.getElementById('BP-1').value;
    let DiaBP = document.getElementById('BP-2').value;
    let SPO2 = document.getElementById('SPO2').value;
    let Pulse = document.getElementById('Pulse').value;
    let msg = document.getElementById('msg')

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
        if(((SysBP<90 || SysBP>150) && SysBP!=NaN) || ((DiaBP<60 || DiaBP>110)&& DiaBP!=NaN) || ((Pulse<40 || Pulse>110) && Pulse!=NaN) || ((SPO2<92 || SPO2>100) && SPO2!=NaN)){
            msg.className = 'alert alert-danger'
            msg.innerHTML = 'Your Readings Are Extreme. You Should Visit A Hospital Immediately'
            msg.style.display = 'block'
        }
        else{
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            today = String(dd) + '/' + String(mm);
        
            var obj = returnDataObject(SysBP,DiaBP,Pulse,SPO2,today);
        
            addToLocalStorage(obj, today);
        
            msg.className = 'alert alert-success'
            msg.innerHTML = 'Readings Added'
            msg.style.display = 'block'
        }
        setTimeout(() => {
            msg.style.display = 'none'
        },2000)
        document.getElementById('BP-1').value = ''
        document.getElementById('BP-2').value = ''
        document.getElementById('Pulse').value = ''
        document.getElementById('SPO2').value = ''
    }
}


function addToLocalStorage(data, today) {
    data = JSON.stringify(data);
    localStorage.setItem(today, data);
}

function returnDataObject(SysBP,DiaBP,Pulse,SPO2,today) {
    if (localStorage.getItem(today) === null) {
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
            SysBP: {value: SysBP, count:count1},
            DiaBP: {value: DiaBP, count:count2},
            Pulse: {value: Pulse, count:count3},
            SPO2:  {value: SPO2, count:count4}
        }

        return obj;
    }
    else{
        var jsonString = localStorage.getItem(today);
        var retrievedObject = JSON.parse(jsonString);

        if(isNaN(DiaBP))
            retrievedObject.DiaBP.value = parseFloat(retrievedObject.DiaBP.value)
        else if(parseFloat(retrievedObject.DiaBP.value) === NaN){
            retrievedObject.DiaBP.value = parseFloat(DiaBP);
            retrievedObject.DiaBP.count ++;
        }
        else{
            retrievedObject.DiaBP.value = parseFloat(retrievedObject.DiaBP.value) + parseFloat(DiaBP);
            retrievedObject.DiaBP.count ++;
        }
         
        if(isNaN(SysBP))
            retrievedObject.SysBP.value = parseFloat(retrievedObject.SysBP.value)
        else if(parseFloat(retrievedObject.SysBP.value) === NaN){
            retrievedObject.SysBP.value = parseFloat(SysBP);
            retrievedObject.SysBP.count ++;
        }
        else{
            retrievedObject.SysBP.value = parseFloat(retrievedObject.SysBP.value) + parseFloat(SysBP);
            retrievedObject.SysBP.count ++;
        }
        
        if(isNaN(Pulse))
            retrievedObject.Pulse.value = parseFloat(retrievedObject.Pulse.value)
        else if(parseFloat(retrievedObject.Pulse.value) === NaN){
            retrievedObject.Pulse.value = parseFloat(Pulse);
            retrievedObject.Pulse.count ++;
        }
        else{
            retrievedObject.Pulse.value = parseFloat(retrievedObject.Pulse.value) + parseFloat(Pulse);
            retrievedObject.Pulse.count ++;
        }

        if(isNaN(SPO2))
            retrievedObject.SPO2.value = parseFloat(retrievedObject.SPO2.value)
        else if(parseFloat(retrievedObject.SPO2.value) === NaN){
            retrievedObject.SPO2.value = parseFloat(SPO2);
            retrievedObject.SPO2.count ++;
        }
        else{
            retrievedObject.SPO2.value = parseFloat(retrievedObject.SPO2.value) + parseFloat(SPO2);
            retrievedObject.SPO2.count ++;
        }
        

        return retrievedObject;
    }
}