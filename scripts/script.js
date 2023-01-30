document.addEventListener("DOMContentLoaded", function() { 
    const jobs = ["Accountant", "Advance Tractor/Trailer Driver", "Agricultural Engineer", "Architect", "Auto Tech/Mechanic", "Aviation Tech. Mechanic", "Biologist", "Bus Driver", "Business Development Officer", "Business Manager (Hotel, etc.)", "CNC Manufacturing", "Carpenter", "Chef", "Chemist", "Civil Engineering Technician", "Commercial Driver", "Computer Technician", "Conserv./Environ. Science", "Corectional Officer", "Cosmetologist", "Credit Union/Bank Manager", "Daycare Director", "Dentist", "Detective", "Diesel Tech/Mechanic", "Doctor/Physician", "Electrician", "Electronic Engineer", "EMT", "Energy Management PG&E", "Engineer", "Fashion Designer", "Fire Fighter", "Forest Ranger", "Graphic/Media Designer", "H/C HVAC", "Highway Patrol", "Home Inspector", "Industrial Mechanic", "Interior Designer", "Investment Analyst", "Lab Technician", "Landscaper Horticulture", "Lawyer", "Marketing/Sales Manager", "Media/Communications", "Medical Repair Tech.", "Military", "Nurse", "Nutritionist", "Oceanographer", "Pastor", "PG&E/AT8&T Technician", "Pharmacist", "Photographer", "Physical Therapist", "Pilot (Commercial)", "Plumber", "Police Officer", "Principal", "Probation Officer", "Psychologist", "Retail Sales Associate", "Social Worker", "Solar Energy Tech.", "Teacher", "UPS/Fed Ex Driver", "Veterinarian", "Welder/Metal Specialist", "Wind Energy Technician"]

    //autocomplete
    const jobListElement = document.querySelector("#job-list");
    const jobInputElement = document.querySelector("#jobInput")

    function loadData(data, element){
        if(data){
            element.innerHTML = "";
            let innerElement = "";
            data.forEach((item) => {
                innerElement += `
                <li>${item}</li>`;
            });

            element.innerHTML = innerElement;
        }
    }

    function filterData(data, searchText){
        return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
    }

    jobInputElement.addEventListener("input", function(){
        if(jobInputElement.value != ""){
            const filteredData = filterData(jobs, jobInputElement.value);
            loadData(filteredData, jobListElement);
        }else{
            jobListElement.innerHTML = "";
        }
    });

    jobInputElement.addEventListener("click", function(){
        if(jobInputElement.value != ""){
            const filteredData = filterData(jobs, jobInputElement.value);
            loadData(filteredData, jobListElement);
        }
    });

    jobInputElement.addEventListener("blur", function(){
        jobListElement.innerHTML = "";
    });
});