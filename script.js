import { tomb } from './script2.js'; 
const h1 = document.querySelector("#szines"); 

// function szines() {
//     //h1.style.color = `rgb(${randint(0, 255)}, ${randint(0, 255)}, ${randint(0, 255)})`;
//    // h1.style.backgroundColor = `rgb(${randint(0, 255)}, ${randint(0, 255)}, ${randint(0, 255)})`;
//     setTimeout(updateBuek, 1000);
// }
// szines();



function keveres(tomb) {
    console.log(tomb);
    for (let i = tomb.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1)); 
        [tomb[i], tomb[random]] = [tomb[random], tomb[i]];  
    }
}

function ShowCards() 
{
    
}

function CreaterCards() {
    const elsoszint = document.querySelector("#ul");

    
    const szintek = document.querySelectorAll('input[name="option"]:checked');
    //ha nem választott szintet ki kell írtani (lekezelni), hogy ne álljon le hibaval 
    let kartyakSzama = 12; 

    const szint = szintek[0].value;
    if (szint === "12") {
        kartyakSzama = 12;  
    } else if (szint === "18") {
        kartyakSzama = 18;  
    } else if (szint === "24") {
        kartyakSzama = 24;  
    }
    //generalas
    for (let i = 0; i < kartyakSzama; i++) {
        const li = document.createElement("li");
        li.classList.add("card");   
        const img = document.createElement("img");
        img.src = tomb[i % tomb.length].url; //kepek azonos nagysaguva tetele! egyik megoldas https://imagecompressor.11zon.com/en/resize-jfif#google_vignette masik megoldas kepmetszoivel hogy png legen es utana egy img resizerbe vagy valamibe 
        img.alt = `Kép ${i + 1}`; // 12 kép van de nekunk parokkal kell szamolni ahogy most van úgy nincs mindegyiknek párja
        li.appendChild(img); 
        elsoszint.appendChild(li);
    }
    keveres(tomb);
    ShowCards()

    
}




function Start() 
{
    Startbutton.removeEventListener("click", Start)
    CreaterCards();
    //Felfedés(); // lehet nem is kell mert a showcards eleg
    ShowCards();
    
}

const Startbutton = document.querySelector("#kuldes");
Startbutton.addEventListener("click", Start)


const table = document.querySelector("body");
