$(function () {
  var currentTimeHour = dayjs().format('H') //pulls the current hour 
  const workHours =[9,10,11,12,13,14,15,16,17] //hours of the usual work days
  const schedulingNotesStored = ["","","","","","","","",""]; //arrays holding text information

   //Display the current date in the header of the page.
   var currentDay = $("#currentDay");
   currentDay.text(dayjs().format('dddd, MMMM D, YYYY h:mm A')); //pull from dayjs and format it accordingly

  $('.time-block').on('click',function(event){ //add listener to all save buttons on click 
    event.preventDefault();
  
    var btnEle = event.target; //save the event.target for comparison later 

    if (btnEle.getAttribute('aria-label') === 'save'){ //makes check that the element being clicked is the button 
      var parentDiv = btnEle.closest("div"); //this returns the corresponding parent div 

      //this variable is dependent on the parentDiv which is dependent on the button pressed 
      var textbox =  parentDiv.querySelector('.description') 


      for (let index = 0; index < schedulingNotesStored.length; index++) { //for loop through the number of available hour blocks

        if (parentDiv.getAttribute('id') == `hour-${workHours[index]}`){ //if the parentDiv ID matches, index dependent string
          schedulingNotesStored[index] = textbox.value; //store the textbox value in the respective index of the array
          //save to local storage, set key to use index. store the respective array index 
          localStorage.setItem(`hour-${workHours[index]}`, schedulingNotesStored[index]) 
          
        }
      }
    }
  })

  //set the text areas to the previously stored local storage
  for (let index = 0; index < schedulingNotesStored.length; index++) { 
    //call the id of the respective container, find the 2nd child, and set it's text with the saved variables from local storage
    $(`#hour-${workHours[index]}`).children().eq(1).text(localStorage.getItem(`hour-${workHours[index]}`)) 
  }

  for (let index = 0 ; index < workHours.length; index++) { //set colors od boxes depending on time of day
    //console.log(workHours[index])
    if (currentTimeHour == workHours[index]){ // if the current time is equal to the work hour show present 
      $("#hour-" + workHours[index])
        .addClass('present');
    }
    else if (currentTimeHour > workHours[index]){ //if the current time is more than the work hour show past 
      $("#hour-" + workHours[index])
        .addClass('past');
    }
    else if (currentTimeHour < workHours[index]){ //if the current time is less than the work hour show future 
      $("#hour-" + workHours[index])
        .addClass('future');
    }
    else if (currentTimeHour < 9 ){ //once it hits midnight the schedule colors will be prepped for new day 
      $("#hour-" + workHours[index])
        .addClass('future');
    }
  }


  $('.clear').on('click', function() { //if user wanted to clear the schedule text boxes and local storage 
    for (let index = 0; index < schedulingNotesStored.length; index++) { 
      $(`#hour-${workHours[index]}`).children().eq(1).text("")
      localStorage.setItem(`hour-${workHours[index]}`, "") 
    }
  })
  })

