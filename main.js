const Letters = "abcdefghijklmnopqrstuvwxyz";

let lettersArray = Array.from(Letters);

let LettersContainer= document.querySelector(".letters");

lettersArray.forEach(Letter => {

    let span = document.createElement("span");
    let theLetter = document.createTextNode(Letter);

    span.appendChild(theLetter);

    span.className = "letterBox";

    LettersContainer.appendChild(span);
})


const word = {
    programming: ["php","javascript","go","scala","fortran","r","mysql","python"],
    movies: ["prestige","inception", "parasite" ,"interstellar","whiplash","memento","coco","up"],
    people: ["Albert Einstein","Hitchcock","alexander","cleopatra","mahatma ghandi"],
    countries: ["syria","palastine","yemen","egypt","bahrain","qatar"]
}


let allKeys = Object.keys(word);

let randomNumbers = Math.floor(Math.random() * allKeys.length);

let randomObjectName = allKeys[randomNumbers];

let randomPropValue = word[randomObjectName];

let randomValueNumbers = Math.floor(Math.random() * randomPropValue.length);

let randomValueName = randomPropValue[randomValueNumbers];

document.querySelector(".game-info .category span").append(randomObjectName);
// console.log(randomValueName)


let lettersGuessContainer = document.querySelector(".letters-guess");

let lettersAndSpaces = Array.from(randomValueName);

lettersAndSpaces.forEach(letter => {
    let emptySpan = document.createElement("span");

    if(letter === " "){
         emptySpan.className = "with-space";
    }
    lettersGuessContainer.appendChild(emptySpan);
})
// console.log(lettersAndSpaces);


let guessSpan = document.querySelectorAll(".letters-guess span");

let worngClicked = 0;

let theDrow = document.querySelector(".hangman-draw");

let successWord = [];

//handle clicking on letters

document.addEventListener("click", (e)=>{
    
    let theStatus = false;

    if(e.target.className === "letterBox"){
        e.target.classList.add("clicked");

        let letterClicked = e.target.innerHTML.toLowerCase();
        // console.log(letterClicked);

        let wordChosen = Array.from(randomValueName.toLowerCase());

        wordChosen.forEach((wordLetter,wordIndex)=>{

            if(letterClicked === wordLetter){
            
                theStatus = true;
            
                guessSpan.forEach((Spans,spanIndex)=>{
            
                    if(wordIndex == spanIndex){
            
                        Spans.innerHTML = wordLetter;
                        successWord[spanIndex] = wordLetter
                    }
                });
                
                
            }
        })

        if(theStatus !== true){
            
            theDrow.classList.add(`wrong-${++worngClicked}`);
            document.getElementById("fail").play();
            

            if(worngClicked === 8){

                gameOver();
                LettersContainer.classList.add("finished");
            }
        }
        else{
            document.getElementById("success").play();
            // console.log(successWord.length);
            // console.log(randomValueName.length);
            if(successWord.join("") === randomValueName){
                LettersContainer.classList.add("finished");
                congratulations();
            }
        }
        // console.log(lettersAndSpaces);
        // console.log(theStatus);
    }
})

function gameOver() {
    let div_fail = document.createElement("div");
    let textFail = document.createTextNode(`Game Over , the word is ${randomValueName}`);

    div_fail.appendChild(textFail);
    div_fail.className = "popup-Fail";

    document.body.appendChild(div_fail)
}
function congratulations() {
    let div_success = document.createElement("div");
    let textSuccess = document.createTextNode(`Correct Answer, Congratulations`);

    div_success.appendChild(textSuccess);
    div_success.className = "popup-Success";

    document.body.appendChild(div_success)
}

