document.addEventListener("DOMContentLoaded", function() { 
    let jobs = {"Accountant": 55650.00, "Advance Tractor/Trailer Driver": 53550.00, "Agricultural Engineer": 56700.00, "Architect": 53550.00, "Auto Tech/Mechanic": 49350.00, "Aviation Tech. Mechanic": 50400.00, "Biologist": 54600.00, "Bus Driver": 37800.00, "Business Development Officer": 54600.00, "Business Manager (Hotel, etc.)": 61950.00, "CNC Manufacturing": 80850.00, "Carpenter": 47250.00, "Chef": 52500.00, "Chemist": 56700.00, "Civil Engineering Technician": 68250.00, "Commercial Driver": 51450.00, "Computer Technician": 46200.00, "Conserv./Environ. Science": 72450.00, "Corectional Officer": 48300.00, "Cosmetologist": 36750.00, "Credit Union/Bank Manager": 61950.00, "Daycare Director": 37800.00, "Dentist": 115500.00, "Detective": 60900.00, "Diesel Tech/Mechanic": 55650.00, "Doctor/Physician": 147000.00, "Electrician": 54600.00, "Electronic Engineer": 75600.00, "EMT": 34650.00, "Energy Management PG&E": 106050.00, "Engineer": 72450.00, "Fashion Designer": 63000.00, "Fire Fighter": 49350.00, "Forest Ranger": 52500.00, "Graphic/Media Designer": 58800.00, "H/C HVAC": 63000.00, "Highway Patrol": 84000.00, "Home Inspector": 56700.00, "Industrial Mechanic": 46200.00, "Interior Designer": 49350.00, "Investment Analyst": 66150.00, "Lab Technician": 42000.00, "Landscaper Horticulture": 48300.00, "Lawyer": 86100.00, "Marketing/Sales Manager": 58800.00, "Media/Communications": 45150.00, "Medical Repair Tech.": 52500.00, "Military": 55650.00, "Nurse": 66150.00, "Nutritionist": 45150.00, "Oceanographer":69300.00, "Pastor": 50400.00, "PG&E/AT8&T Technician": 79750.00, "Pharmacist": 105000.00, "Photographer": 45150.00, "Physical Therapist": 72450.00, "Pilot (Commercial)": 78750.00, "Plumber": 52500.00, "Police Officer": 53550.00, "Principal": 93450.00, "Probation Officer": 44100.00, "Psychologist": 77700.00, "Retail Sales Associate": 34650.00, "Social Worker": 50400.00, "Solar Energy Tech.": 53550.00, "Teacher": 52500.00, "UPS/Fed Ex Driver": 68250.00, "Veterinarian": 82950.00, "Welder/Metal Specialist": 47250.00, "Wind Energy Technician": 56700.00}

    //autocomplete
    const jobListElement = document.querySelector("#job-list");
    const jobInputElement = document.querySelector("#jobInput");
    const error = document.querySelector(".jd p");
    const rowHTML = document.querySelector("#rowCopy");

    function loadData(data, element){
        if(data){
            element.innerHTML = "";
            let innerElement = "";
            data.forEach((item) => {
                innerElement += `
                <li id = "job-item">${item}</li>`;
            });

            element.innerHTML = innerElement;
        }
    }

    function filterData(data, searchText){
        return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
    }

    function deduct(data){
        let salary = jobs[data].toFixed(2);

        let annual = document.querySelector(".annual h3:nth-child(3)");
        annual.innerText = salary;

        let monthly = document.querySelector(".monthly h3:nth-child(3)");
        let monthGross = salary/12;
        monthGross = monthGross.toFixed(2);
        monthly.innerText = monthGross;

        let fed = document.querySelector(".fed td:last-child");
        let fedT = (monthGross * .12).toFixed(2);
        fed.innerText = fedT;

        let state = document.querySelector(".state td:last-child");
        let stateT = (monthGross * .07).toFixed(2);
        state.innerText = stateT;

        let ss = document.querySelector(".ss td:last-child");
        let ssT = (monthGross * .062).toFixed(2);
        ss.innerText = ssT;

        let med = document.querySelector(".med td:last-child");
        let medT = (monthGross * .0145).toFixed(2);
        med.innerText = medT;

        let sd = document.querySelector(".sd td:last-child");
        let sdT = (monthGross * .01).toFixed(2);
        sd.innerText = sdT;

        let ri = document.querySelector(".ri td:last-child");
        let riT = (monthGross * .05).toFixed(2);
        ri.innerText = riT

        let miT = 180.00;

        let td = document.querySelector(".td td:last-child");
        let tdT = (+fedT + +stateT + +ssT + +medT + +sdT + +riT + +miT).toFixed(2);
        td.innerText = tdT

        let house = document.querySelector(".house p:last-child");
        let housePay = (monthGross * .33).toFixed(2);
        house.innerText = `$ ${housePay}`;

        return tdT;
    }

    function unloadDeduct(){
        document.querySelector(".annual h3:last-child").innerText = "";
        document.querySelector(".monthly h3:last-child").innerText = "";

        let deductItems = document.querySelectorAll(".deduct tr td:last-child");
        deductItems.forEach((item) => {
            if(item.innerText != 180.00){
                item.innerText = "";
            }
        });
        document.querySelector(".house p:last-child").innerText = "";
    };

    jobInputElement.addEventListener("input", function(){
        error.innerText = ""
        unloadDeduct();
        const filteredData = filterData(Object.keys(jobs), jobInputElement.value);
        loadData(filteredData, jobListElement);
    });

    jobInputElement.addEventListener("click", function(){
        error.innerText = "";
        jobInputElement.value = '';
        unloadDeduct();
        const filteredData = filterData(Object.keys(jobs), jobInputElement.value);
        loadData(filteredData, jobListElement);
    });

    jobInputElement.addEventListener("keypress", function(event){
        if(event.key == "Enter"){
            let match = false;
            for(var i=0; i<Object.keys(jobs).length; i++){
                if(Object.keys(jobs)[i].toLowerCase() == jobInputElement.value.toLowerCase()){
                    match = true;
                    let job = Object.keys(jobs)[i];
                    jobInputElement.value = job;
                    jobListElement.innerHTML = '';
                    let deductions = deduct(job);
                    payCheck(jobs[job]/12, deductions);
                    if(document.querySelector(".bal tbody").children.length <= 2){
                        addRows();
                    };
                    break;              
                };
            };
            if(!match){
                error.innerText = "Not a valid job.";
            };
        };
    });

    document.addEventListener("click", function(event){
        if(event.target.id == "job-item"){
            jobInputElement.focus()
            let job = event.target.innerText;
            jobInputElement.value = job;
            jobListElement.innerHTML = '';
            let deductions = deduct(job);
            payCheck(jobs[job]/12, deductions);
            if(document.querySelector(".bal tbody").children.length <= 2){
                addRows();
            };
        }else if(event.target.id == "jobInput"){

        }else{
            jobListElement.innerHTML = '';
        }
    });

    //check balance
    const rCode = document.querySelector("#code");
    const rDate = document.querySelector("#date");
    const rDesc = document.querySelector("#desc");
    const rNeg = document.querySelector("#neg");
    const rPos = document.querySelector("#pos");
    const rAmount = document.querySelector("#amount");
    const rArr = [rCode, rDate, rDesc, rNeg, rPos, rAmount];

    function addRows(){
        let table = document.querySelector(".bal tbody");
        let row = table.insertRow(2);
        for(var i=0; i<6; i++){
            let cell = row.insertCell(i);
            cell.innerHTML = `<input type="text" size="1" spellcheck="false"></input>`;
        };
    }

    function payCheck(pay, deduct){
        let balance = pay - deduct;

        let desc = rowHTML.querySelector("#desc input");
        desc.value = "Paycheck";

        let amount = rowHTML.querySelector("#pos input");
        amount.value = `$${balance}`;

        let bal = rowHTML.querySelector("#amount input");
        bal.value = `$${balance}`;
    }

    function deposit(bal, deposit, element){
        let newBal = bal + deposit;
        element.innerText = `$${newBal}`;
    }

    function withdrawl(bal, withdrawl, element){
        let newBal = bal - withdrawl;
        element.innerText = `$${newBal}`;
    }

    document.addEventListener("blur", function(){
        console.log(9)
        let match = false
        for(var i=0; i<rArr.length; i++){
            if(elem == rArr[i]){
                match = true;
                break;
            }
        }
        if(match){
            console.log(9)
            addRows();
        }
    }));    
});