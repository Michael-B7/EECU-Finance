document.addEventListener("DOMContentLoaded", function() { 
    const jobs = {"Accountant": 55650.00, "Advance Tractor/Trailer Driver": 53550.00, "Agricultural Engineer": 56700.00, "Architect": 53550.00, "Auto Tech/Mechanic": 49350.00, "Aviation Tech. Mechanic": 50400.00, "Biologist": 54600.00, "Bus Driver": 37800.00, "Business Development Officer": 54600.00, "Business Manager (Hotel, etc.)": 61950.00, "CNC Manufacturing": 80850.00, "Carpenter": 47250.00, "Chef": 52500.00, "Chemist": 56700.00, "Civil Engineering Technician": 68250.00, "Commercial Driver": 51450.00, "Computer Technician": 46200.00, "Conserv./Environ. Science": 72450.00, "Corectional Officer": 48300.00, "Cosmetologist": 36750.00, "Credit Union/Bank Manager": 61950.00, "Daycare Director": 37800.00, "Dentist": 115500.00, "Detective": 60900.00, "Diesel Tech/Mechanic": 55650.00, "Doctor/Physician": 147000.00, "Electrician": 54600.00, "Electronic Engineer": 75600.00, "EMT": 34650.00, "Energy Management PG&E": 106050.00, "Engineer": 72450.00, "Fashion Designer": 63000.00, "Fire Fighter": 49350.00, "Forest Ranger": 52500.00, "Graphic/Media Designer": 58800.00, "H/C HVAC": 63000.00, "Highway Patrol": 84000.00, "Home Inspector": 56700.00, "Industrial Mechanic": 46200.00, "Interior Designer": 49350.00, "Investment Analyst": 66150.00, "Lab Technician": 42000.00, "Landscaper Horticulture": 48300.00, "Lawyer": 86100.00, "Marketing/Sales Manager": 58800.00, "Media/Communications": 45150.00, "Medical Repair Tech.": 52500.00, "Military": 55650.00, "Nurse": 66150.00, "Nutritionist": 45150.00, "Oceanographer":69300.00, "Pastor": 50400.00, "PG&E/AT8&T Technician": 79750.00, "Pharmacist": 105000.00, "Photographer": 45150.00, "Physical Therapist": 72450.00, "Pilot (Commercial)": 78750.00, "Plumber": 52500.00, "Police Officer": 53550.00, "Principal": 93450.00, "Probation Officer": 44100.00, "Psychologist": 77700.00, "Retail Sales Associate": 34650.00, "Social Worker": 50400.00, "Solar Energy Tech.": 53550.00, "Teacher": 52500.00, "UPS/Fed Ex Driver": 68250.00, "Veterinarian": 82950.00, "Welder/Metal Specialist": 47250.00, "Wind Energy Technician": 56700.00}

    //autocomplete
    const jobListElement = document.querySelector("#job-list");
    const jobInputElement = document.querySelector("#jobInput")

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

    jobInputElement.addEventListener("input", function(){
        if(jobInputElement.value != ""){
            const filteredData = filterData(Object.keys(jobs), jobInputElement.value);
            loadData(filteredData, jobListElement);
        }
    });

    jobInputElement.addEventListener("click", function(){
        if(jobInputElement.value != ""){
            const filteredData = filterData(Object.keys(jobs), jobInputElement.value);
            loadData(filteredData, jobListElement);
        }
    });

    jobInputElement.addEventListener("blur", function(){
        document.addEventListener("click", function(event){
            if(event.target.id != "job-item"){
                jobListElement.innerHTML = '';
            }else{
                jobInputElement.focus()
            }
        });
    });

    document.addEventListener("click", function(event){
        let job;
        if(event.target.id == "job-item"){
            job = event.target.innerText;
        }
    });
});