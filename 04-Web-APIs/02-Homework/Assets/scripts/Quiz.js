let divQuestion = document.querySelector("#divQuestion");
let divAnswerA = document.querySelector("#divAnswerA");
let divAnswerB = document.querySelector("#divAnswerB");
let divAnswerC = document.querySelector("#divAnswerC");
let divAnswerD = document.querySelector("#divAnswerD");
let divInto = document.querySelector("#divInto");
let spnTimer = document.querySelector("#spnTimer");
let divMessage = document.querySelector("#divMessage");
let spnScore = document.querySelector("#spnScore");
let spnQuestion = document.querySelector("#spnQuestion");
let txtQuestions = document.querySelector("#txtQuestions");

let remainingTime = 0;
let timer;
let numberofQuestions = 0;
let currentQuestion = null;
let questionList = JSON.parse('[{"Number": 1, "Question": "Which vegetable gives Popeye his strength?", "A": "Broccoli", "B": "Spinach", "C": "Asparagus", "D": "Lentils", "Answer": "B"}, {"Number": 2, "Question": "Who was the ancient Greek goddess of love and beauty?", "A": "Aphrodite", "B": "Calliope", "C": "Athena", "D": "Calypso", "Answer": "A"}, {"Number": 3, "Question": "Which alcoholic drink is made from the leaves of the agave plant and gets its name from an area around a Mexican city?", "A": "Tequila", "B": "Singani", "C": "Chicha", "D": "Kasiri", "Answer": "A"}, {"Number": 4, "Question": "What does the Q in IQ stand for?", "A": "Quantity", "B": "Quorum", "C": "Quality", "D": "Quotient", "Answer": "D"}, {"Number": 5, "Question": "What is the name of Superman\u2019s home planet?", "A": "Argon", "B": "Rann", "C": "Krypton", "D": "Qward", "Answer": "C"}, {"Number": 6, "Question": "According to legend, kissing which stone in Ireland gives you the gift of the gab?", "A": "The Blarney Stone", "B": "The Baloney Stone", "C": "The Rosetta Stone", "D": "The Stone of Destiny", "Answer": "A"}, {"Number": 7, "Question": "In which U.S. city is NASA\u2019s Mission Control Center located?", "A": "Huntsville, Alabama", "B": "Houston, Texas", "C": "Hampton, Virginia", "D": "Cape Canaveral, Florida", "Answer": "B"}, {"Number": 8, "Question": "What is the Latin word for \u201cbeyond\u201d, often used as a prefix to signify an extreme?", "A": "Extra", "B": "Super", "C": "Ultra", "D": "Mega", "Answer": "C"}, {"Number": 9, "Question": "Bronze is mainly an alloy of tin and which other metal?", "A": "Brass", "B": "Lead", "C": "Iron", "D": "Copper", "Answer": "D"}, {"Number": 10, "Question": "In meteorology, what name is given to a line of equal pressure on a map?", "A": "Isotherm", "B": "Isobar", "C": "Isochor", "D": "Isoquant", "Answer": "B"}, {"Number": 11, "Question": "Formentera is part of which group of Spanish islands?", "A": "Canary Islands", "B": "Cies Islands", "C": "Medes Islands", "D": "Balearic Islands", "Answer": "D"}, {"Number": 12, "Question": "In which U.S. national park is the Old Faithful geyser found?", "A": "Yellowstone", "B": "Death Valley", "C": "Yosemite", "D": "Carlsbad Caverns", "Answer": "D"}, {"Number": 13, "Question": "Casablanca is the largest city in which African country?", "A": "Egypt", "B": "Morocco", "C": "Tunisia", "D": "Algeria", "Answer": "B"}, {"Number": 14, "Question": "What is the largest freshwater lake in the world by surface area?", "A": "Lake Superior", "B": "Lake Victoria", "C": "Lake Tanganyika", "D": "Lake Baikal", "Answer": "A"}, {"Number": 15, "Question": "Toronto is the capital city of which Canadian province?", "A": "Alberta", "B": "Quebec", "C": "British Columbia", "D": "Ontario", "Answer": "D"}, {"Number": 16, "Question": "The architect I.M. Pei designed a glass and steel pyramid for which capital city?", "A": "London", "B": "Paris", "C": "Beijing", "D": "Tokyo", "Answer": "B"}, {"Number": 17, "Question": "Which Spanish city is famous for its \u2018running of the bull\u2019 during the annual San Fermin festival?", "A": "Barcelona", "B": "Seville", "C": "Pamplona", "D": "Tarragona", "Answer": "C"}, {"Number": 18, "Question": "What is the national flower of Scotland?", "A": "Heather", "B": "Gorse", "C": "Bluebell", "D": "Thistle", "Answer": "D"}, {"Number": 19, "Question": "Manitoulin Island is the world\u2019s largest island in a lake. In which of the Great Lakes of North America is it found?", "A": "Lake Huron", "B": "Lake Michigan", "C": "Lake Erie", "D": "Lake Ontario", "Answer": "A"}, {"Number": 20, "Question": "What is the capital city of Ukraine?", "A": "Kiev", "B": "Vilnius", "C": "Minsk", "D": "Pristina", "Answer": "A"}, {"Number": 21, "Question": "What was the name of the ship in which Captain James Cook made his first expedition to the Pacific Ocean?", "A": "Beagle", "B": "Endeavour", "C": "Bounty", "D": "Endurance", "Answer": "B"}, {"Number": 22, "Question": "Which naval battle between the British fleet and the combined French and Spanish fleets took place on the 21st October, 1805?", "A": "Battle of Waterloo", "B": "Battle of Trafalgar", "C": "Battle of Jutland", "D": "Battle of the Nile", "Answer": "B"}, {"Number": 23, "Question": "Napoloen Bonaparte escaped from his exile on which Mediterranean island in February, 1815?", "A": "Corsica", "B": "Capri", "C": "Sicily", "D": "Elba", "Answer": "D"}, {"Number": 24, "Question": "Operation Overlord took place on the beaches of which region of France in June, 1944?", "A": "Provence", "B": "Aquitaine", "C": "Burgundy", "D": "Normandy", "Answer": "D"}, {"Number": 25, "Question": "Which U.S. president said, \u201cgovernment of the people, by the people, for the people\u201d in his Gettysburg Address?", "A": "Abraham Lincoln", "B": "George Washington", "C": "Thomas Jefferson", "D": "James Buchanan", "Answer": "A"}, {"Number": 26, "Question": "Who was Roman emperor at the time of Christ\u2019s crucifixion?", "A": "Nero", "B": "Pontius Pilate", "C": "Tiberius", "D": "Julius Caesar", "Answer": "D"}, {"Number": 27, "Question": "In what year did the Bay of Pigs invasion take place?", "A": "1959", "B": "1961", "C": "1963", "D": "1965", "Answer": "B"}, {"Number": 28, "Question": "What was the name of the first spacecraft to land on the moon?", "A": "Spider", "B": "Eagle", "C": "Intrepid", "D": "Falcon", "Answer": "B"}, {"Number": 29, "Question": "Where was the second atomic bomb dropped in World War 2?", "A": "Nagasaki", "B": "Hiroshima", "C": "Osaka", "D": "Yokohama", "Answer": "A"}, {"Number": 30, "Question": "Which U.S. president abolished slavery?", "A": "Thomas Jefferson", "B": "James Garfield", "C": "Abraham Lincoln", "D": "Andrew Johnson", "Answer": "C"}, {"Number": 31, "Question": "What is the name of the winged horse of Greek legend?", "A": "Centaur", "B": "Hippocampus", "C": "Pegasus", "D": "Unicorn", "Answer": "C"}, {"Number": 32, "Question": "What nationality was the artist Rembrandt?", "A": "German", "B": "Belgian", "C": "Swiss", "D": "Dutch", "Answer": "D"}, {"Number": 33, "Question": "Who created and wrote about the fictional continent Middle Earth?", "A": "Terry Pratchett", "B": "J. R. R. Tolkien", "C": "George R. R. Martin", "D": "Neil Gaiman", "Answer": "B"}, {"Number": 34, "Question": "How was American writer Samuel Langhorne Clemens better known?", "A": "Mark Twain", "B": "Walt Whitman", "C": "Joseph Heller", "D": "John Steinbeck", "Answer": "A"}, {"Number": 35, "Question": "Which artist\u2019s works include \u201cThe Persistence of Memory\u201d, \u201cThe Temptation of St. Anthony\u201d, and \u201cLobster Telephone\u201d?", "A": "Picasso", "B": "Salvador Dali", "C": "Jackson Pollock", "D": "Rene Magritte", "Answer": "B"}, {"Number": 36, "Question": "In which novel are Ralph, Jack and Peterkin three castaways?", "A": "Treasure Island", "B": "Lord of the Flies", "C": "The Coral Island", "D": "Robinson Crusoe", "Answer": "C"}, {"Number": 37, "Question": "Which classic science fiction novel begins with the line, \u201cBehind every man now alive stand thirty ghosts, for that is the ratio by which the dead outnumber the living\u201d?", "A": "2001 \u2013 A Space Odyssey", "B": "The Time Machine", "C": "Dune", "D": "The Martian Chronicles", "Answer": "A"}, {"Number": 38, "Question": "Pablo Picasso and George Braques were pioneers of which early nineteenth century art movement noted for it\u2019s concentration on geometrical figures?", "A": "Impressionism", "B": "Realism", "C": "Cubism", "D": "Abstract Expressionism", "Answer": "C"}, {"Number": 39, "Question": "Which novel begins with the line, \u201cIt was a bright cold day in April, and the clocks were striking thirteen\u201d?", "A": "1984", "B": "David Copperfield", "C": "The Great Gatsby", "D": "Ulysses", "Answer": "A"}, {"Number": 40, "Question": "Which Italian artist painted the Sistine Chapel ceiling?", "A": "Botticelli", "B": "Michelangelo", "C": "Leonardo da Vinci", "D": "Caravaggio", "Answer": "B"}]');
let pastQuestions = [];
let score = 0;
const name = "quiz_scores"

let Hightlight = (tag) => {
    tag.classList.remove("alert-secondary");
    tag.classList.add("alert-dark");
}
let Unhightlight = (tag) => {
    tag.classList.remove("alert-dark");
    tag.classList.remove("alert-success");
    tag.classList.add("alert-secondary");
}
let CorrectLight = (tag) => {
    tag.classList.remove("alert-dark");
    tag.classList.remove("alert-secondary");
    tag.classList.add("alert-success");
}


let Questions = (show) =>{
    if (show) {
        divQuestion.style.display = "block";
        divAnswerA.style.display = "block";
        divAnswerB.style.display = "block";
        divAnswerC.style.display = "block";
        divAnswerD.style.display = "block";
        spnScore.style.display = "block";
        spnQuestion.style.display = "block";
      } else {
        divQuestion.style.display = "none";
        divAnswerA.style.display = "none";
        divAnswerB.style.display = "none";
        divAnswerC.style.display = "none";
        divAnswerD.style.display = "none";
        spnScore.style.display = "none";
        spnQuestion.style.display = "none";
      }
}

let CheckAnswer = (target) => {
    var selected = target.getAttribute("answer-choice");
    var correctDiv;
    switch(currentQuestion["Answer"]){
        case "A": correctDiv = divAnswerA; break;
        case "B": correctDiv = divAnswerB; break;
        case "C": correctDiv = divAnswerC; break;
        case "D": correctDiv = divAnswerD; break;
    }
    CorrectLight(correctDiv);
    divMessage.style.display = "block";
    if(selected == currentQuestion["Answer"]){
        score++;
        divMessage.textContent = "Correct!";
        divMessage.classList.remove("alert-danger");
        divMessage.classList.add("alert-success");
    }
    else{
        remainingTime = remainingTime - 5;
        divMessage.textContent = "Wrong!";
        divMessage.classList.remove("alert-success");
        divMessage.classList.add("alert-danger");
    }
    numberofQuestions--;
    (numberofQuestions > 0) ? setTimeout("NextQuestion()", 500) : setTimeout("ShowResults()", 500);
}

let ShowQuestion = (question) => {
    divMessage.style.display = "none";
    divQuestion.textContent = question["Question"];
    divAnswerA.textContent = question["A"];
    divAnswerB.textContent = question["B"];
    divAnswerC.textContent = question["C"];
    divAnswerD.textContent = question["D"];
    Unhightlight(divAnswerA);
    Unhightlight(divAnswerB);
    Unhightlight(divAnswerC);
    Unhightlight(divAnswerD);
}

let ShowResults = () => {
    Questions(false);
    document.querySelector("#divResults").style.display = "block";
    document.querySelector("#spnTotalScore").textContent = String(score);
    divMessage.style.display = "none";
}

let NextQuestion = () => {
    if(numberofQuestions >0 && remainingTime > 0){
        let questionNumber = 0;
        do{
            questionNumber = Math.floor(Math.random() * 40);
        }while(pastQuestions.includes(questionNumber))
        pastQuestions.push(questionNumber);
        currentQuestion = questionList[questionNumber];
        ShowQuestion(currentQuestion);
        spnScore.textContent = "Score: "+ String(score);
        spnQuestion.textContent = "Question " + (parseInt(txtQuestions.value) - numberofQuestions + 1) + " of "+ txtQuestions.value;
    }
}

let StartTimer = () => {
    timer = setInterval(() => {
        if(remainingTime > 0){
            remainingTime--;
            spnTimer.innerHTML = String(remainingTime);
        }
        else{
            clearInterval(timer);
            spnTimer.innerHTML = String("0");
            ShowResults();
        }
    }, 1000);    
}


document.querySelector("#btnEnter").addEventListener("click", () => {
    if (divEnter.style.display === "none")
        divEnter.style.display = "block";
    else
        divEnter.style.display = "none";
    numberofQuestions = parseInt(txtQuestions.value);
    remainingTime = numberofQuestions * 10;
    spnTimer.innerHTML = String(remainingTime);
    Questions(true);
    StartTimer();
    NextQuestion();
});


document.querySelector("#btnSave").addEventListener("click", () => {
    let local_storage_quiz_scores = localStorage.getItem(name);
    let quiz_scores = [];
    if (local_storage_quiz_scores != null)
        quiz_scores = JSON.parse(local_storage_quiz_scores);
    quiz_scores.push({initials: document.querySelector("#txtInitials").value, highest_score: parseInt(score)});
    localStorage.setItem(name, JSON.stringify(quiz_scores));
    window.location.href = window.location.href;
});

document.querySelector("#btnBack").addEventListener("click", () => {
    window.location.href = window.location.href;
});

document.querySelector("#btnRefresh").addEventListener("click", () => {
    window.location.href = window.location.href;
});

aHighScores.addEventListener("click", (e) => {
    e.preventDefault();
    divEnter.style.display = "none";
    Questions(false);
    divResults.style.display = "none";
    document.querySelector("#divHighScores").style.display = "block";
    var local_storage_quiz_scores = localStorage.getItem(name);
    var quiz_scores = [];
    if (local_storage_quiz_scores != null)
        quiz_scores = JSON.parse(local_storage_quiz_scores);
    tableBody = document.querySelector("#tBodyHighScores");
    tBodyHighScores.innerHTML = "";
    quiz_scores.forEach(element => {
        var row = document.createElement('tr');
        for(var i in element){
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(element[i]));
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    });
    document.querySelector("#divMain").style.display = "none";
    
});



divAnswerA.addEventListener("click", (e) => CheckAnswer(e.target));
divAnswerB.addEventListener("click", (e) => CheckAnswer(e.target));
divAnswerC.addEventListener("click", (e) => CheckAnswer(e.target));
divAnswerD.addEventListener("click", (e) => CheckAnswer(e.target));

divAnswerA.addEventListener("mouseover", (e) => Hightlight(e.target));
divAnswerB.addEventListener("mouseover", (e) => Hightlight(e.target));
divAnswerC.addEventListener("mouseover", (e) => Hightlight(e.target));
divAnswerD.addEventListener("mouseover", (e) => Hightlight(e.target));

divAnswerA.addEventListener("mouseout", (e) => Unhightlight(e.target));
divAnswerB.addEventListener("mouseout", (e) => Unhightlight(e.target));
divAnswerC.addEventListener("mouseout", (e) => Unhightlight(e.target));
divAnswerD.addEventListener("mouseout", (e) => Unhightlight(e.target));