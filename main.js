var j = 0;
var correct;
var Ques = document.querySelector(".question");
var opt1 = document.querySelector(".option1 p");
var opt2 = document.querySelector(".option2 p");
var opt3 = document.querySelector(".option3 p");
var opt4 = document.querySelector(".option4 p");
var next = document.querySelector(".nextQues");
var sectionBlock = document.querySelector(".section");
var submitBtn = document.querySelector(".submit");
var allOption = document.querySelectorAll(".pos");
var slider = document.querySelector(".slide");
var progress_per = document.querySelector(".progress p");
var main = document.querySelector(".main");
var resultSec = document.querySelector(".result");
var resultDisplay = document.querySelector(".result-main");
var Per = 0;
var widths = 0;
var arr = [];
var arr2 = [];
var index1;
var actualTarget;
var findingClass;
var marks = 0;

submitBtn.addEventListener("click", function() {
  for (var i = 0; i < 5; i++) {
    if (arr[i] == arr2[i]) {
      return (marks += 10);
      console.log("marks" + " " + marks + " " + i);
    }
  }
  submitBtn.style.display = "none";
  main.classList.add("animSec");
  slider.style.width = "100%";
  slider.classList.add("barhide");
  resultSec.textContent = marks;

  /*    submitBtn.style.transition="1s";*/
});

next.addEventListener("click", function() {
  if (j < 19) {
    pushArray(actualTarget);
    widths += 5;
    Per += 5;
    progress_per.textContent = Per + "%";
    slider.style.width = widths + "%";
    console.log(widths);
  }
  if (j === 19) {
    pushArray(actualTarget);
    widths = 100;
    Per = 100;
    progress_per.textContent = Per + "%";
    slider.style.width = widths + "%";
    console.log(widths);
  }
  exchangeColor(allOption);
  quiz();
  actualTarget = "";
  j++;
  submit(j);
});

/*display the submit butto*/
function submit(valu) {
  if (valu === 19) {
    next.style.display = "none";
    submitBtn.style.display = "block";
    console.log("Happy");
  } else {
    next.style.display = "block";
    submitBtn.style.display = "none";
  }
}
submitBtn.addEventListener("click", function() {
  resultDisplay.classList.add("animResSec");
});

/*to find the current index in nodelist*/
for (i = 0; i < allOption.length; i++) {
  allOption[i].index = i;
  allOption[i].addEventListener("click", function(e) {
    if (e.target.tagName == "P") {
      index1 = e.target.parentNode;
      actualTarget = index1.index;
      findingClass = index1.className;
      console.log(findingClass);
    } else {
      index1 = e.target;
      actualTarget = index1.index;
      findingClass = index1.className;
      console.log(findingClass);
    }
    exchangeColor(allOption);
    index1.classList.add("addClass");
  });
}

/*pushing the choice into the array*/
function pushArray(choice) {
  arr2.push(choice);
  console.log(arr2);
}
/*for onclick color*/
function exchangeColor(datas) {
  for (var h = 0; h < datas.length; h++) {
    if (datas[h].classList.value != "pos") {
      datas[h].classList.remove("addClass");
    }
  }
}

function quiz() {
  var data = new XMLHttpRequest();
  data.open("GET", "question.json", true);
  data.onreadystatechange = function() {
    if (data.readyState == 4 && data.status == 200) {
      var values = JSON.parse(data.responseText);
      Ques.innerHTML = values.AllQuestion[j].q;
      opt1.innerHTML = values.AllQuestion[j].A;
      opt2.innerHTML = values.AllQuestion[j].B;
      opt3.innerHTML = values.AllQuestion[j].C;
      opt4.innerHTML = values.AllQuestion[j].D;
      correct = values.AllQuestion[j].answer;
      arr.push(correct);
      console.log(arr + " " + "dataaa");
    }
  };
  data.send();
}
quiz();
