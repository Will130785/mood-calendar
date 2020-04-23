let headingContainer = document.querySelector(".heading-container");
let calendarContainer = document.querySelector(".calendar-container");
let dates = document.querySelectorAll(".date");


let mood = "";

//Load items from storage upon page load
window.addEventListener("DOMContentLoaded", () => {
    //Get items from storage
    const selDates = JSON.parse(localStorage.getItem("selectedDates"));

    //Check storage contains items
    if(selDates !== null && selDates.length > 0) {
        //Loop through dates
        dates.forEach((date, index) => {
            //Loop through selDates array
            for(let i = 0; i < selDates.length; i++) {

                //If indexes in selDates match the index of a date, add class and set background color
                if(selDates[i].indexOf(index) > -1) {
                    date.classList.add("selected");
                    date.style.backgroundColor = selDates[i][1];
                }
            }

        });
    }

});

//Event listener for mood icons
headingContainer.addEventListener("click", e => {

    //Check which icon is clicked and set mood and border accordigly
    if(e.target.classList.contains("delighted")) {
        mood = "delighted";
        document.querySelector(".delighted").classList.add("delighted-clicked");
        document.querySelector(".happy").classList.remove("happy-clicked");
        document.querySelector(".normal").classList.remove("normal-clicked");
        document.querySelector(".angry").classList.remove("angry-clicked");
        document.querySelector(".furious").classList.remove("furious-clicked");
    } else if(e.target.classList.contains("happy")) {
        mood = "happy";
        document.querySelector(".delighted").classList.remove("delighted-clicked");
        document.querySelector(".happy").classList.add("happy-clicked");
        document.querySelector(".normal").classList.remove("normal-clicked");
        document.querySelector(".angry").classList.remove("angry-clicked");
        document.querySelector(".furious").classList.remove("furious-clicked");
    } else if(e.target.classList.contains("normal")) {
        mood = "normal";
        document.querySelector(".delighted").classList.remove("delighted-clicked");
        document.querySelector(".happy").classList.remove("happy-clicked");
        document.querySelector(".normal").classList.add("normal-clicked");
        document.querySelector(".angry").classList.remove("angry-clicked");
        document.querySelector(".furious").classList.remove("furious-clicked");
    } else if(e.target.classList.contains("angry")) {
        mood = "angry";
        document.querySelector(".delighted").classList.remove("delighted-clicked");
        document.querySelector(".happy").classList.remove("happy-clicked");
        document.querySelector(".normal").classList.remove("normal-clicked");
        document.querySelector(".angry").classList.add("angry-clicked");
        document.querySelector(".furious").classList.remove("furious-clicked");
    } else if(e.target.classList.contains("furious")) {
        mood = "furious";
        document.querySelector(".delighted").classList.remove("delighted-clicked");
        document.querySelector(".happy").classList.remove("happy-clicked");
        document.querySelector(".normal").classList.remove("normal-clicked");
        document.querySelector(".angry").classList.remove("angry-clicked");
        document.querySelector(".furious").classList.add("furious-clicked");
    } else if(!e.target.classList.contains("icon")) {
        mood = "";
        document.querySelector(".delighted").classList.remove("delighted-clicked");
        document.querySelector(".happy").classList.remove("happy-clicked");
        document.querySelector(".normal").classList.remove("normal-clicked");
        document.querySelector(".angry").classList.remove("angry-clicked");
        document.querySelector(".furious").classList.remove("furious-clicked");
    }
});

//Event listener for individual dates
calendarContainer.addEventListener("click", e => {
    //Check item clicked has a class of date
    if(e.target.classList.contains("date")) {

        //Check mood and apply background color accordingly
        if(mood === "delighted") {
            e.target.style.backgroundColor = "green";
        } else if(mood === "happy") {
            e.target.style.backgroundColor = "lightgreen";
        } else if(mood === "normal") {
            e.target.style.backgroundColor = "yellow";
        } else if(mood === "angry") {
            e.target.style.backgroundColor = "orange";
        } else if(mood === "furious") {
            e.target.style.backgroundColor = "red";
        }

        //Check item does not contain a selected class and add the class
        if(!e.target.classList.contains("selected") && mood !== "") {
    
            e.target.classList.add("selected");

            //Select all dates with a selected class
            const selected = document.querySelectorAll(".selected");

            //Create a selected index variable using the spread operator and map
            const selectedIndex = [...selected].map(selection => {

            //Create selection array with index and background color
            let selectionObj = [
                [...dates].indexOf(selection),
                selection.style.backgroundColor
            ]
            // return [...dates].indexOf(selection);

            return selectionObj
        });

        //Set to local storage
        localStorage.setItem("selectedDates", JSON.stringify(selectedIndex));

        }
    
    }
});
