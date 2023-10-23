let currentMessageIndex = 0;
const messages=["👋 Welkom! Ik ben Caleb. Uw virtuele assistent.\n\nIk ben hier om jouw organisatie veiliger te maken en te helpen bij de voorbereiding op de nieuwe NIS2-wetgeving.",
" Voordat we uw beveiligingsbeleid bespreken, willen we graag enkele basisgegevens over uw organisatie verzamelen. Tijdens dit proces zullen we ook een technische scan uitvoeren om het aanvalsoppervlak in kaart te brengen. \n\n We verzekeren u dat deze scan geen gevoelige gegevens verzamelt en gericht is op het verbeteren van uw beveiliging. Dank u voor uw medewerking!",
"It doesn't require special expertise to work with me.  It is as easy as typing to a colleague.  Yet, I always provide valuable feedback and ideas that even experts will appreciate.",
"Cyber security is very important, but staying on top of it can be expensive and stressful.",
"My mission is to help everyone have world class cyber security, even if they are not a giant company.",
"Cyber security should not be locked behind giant paywalls.",
"We love AI, but human expertise is crucial when security is on the line.",
"If you want to try Clember, sign up here. Speak to you soon!"];

let i = 0
  , currentText = messages[0];
const animatedText = document.getElementById("animated-text")
  , scrollBtn = document.getElementById("scroll-btn")
 , startBtn = document.getElementById("start-btn")
  , signupBtn = document.getElementById("signup");
scrollBtn.style.display = "none";
const buttonMessages = ["", "T" ,"", "See the benefits", "Read our mission", "Our vision", "Meet the team", "Get in touch"];
let currentButtonMessageIndex = 0;
const glow = document.querySelector(".glow");
let glowSize = 4;
function updateLogoGlow() {
    i < currentText.length ? (glowSize += .2,
    glowSize > 12 && (glowSize = 4),
    glow.style.boxShadow = `0 0 ${glowSize}px ${glowSize / 2}px #2A47D9`,
    glow.style.opacity = 1) : glow.style.opacity = 0
}
function typeWriter() {
    i < currentText.length ? (animatedText.innerHTML += currentText.charAt(i),
    i++,
    setTimeout(typeWriter, 20),
    updateLogoGlow()) : (updateButtonMessage(),
    updateButtonVisibility())
}
function updateButtonVisibility() {
    // Check if the button should be displayed based on conditions
    if (i < currentText.length || (currentButtonMessageIndex >= buttonMessages.length && currentButtonMessageIndex >= 3)) {
        scrollBtn.style.display = "block";
    } else {
        // Hide the button if none of the conditions are met
        scrollBtn.style.display = "none";
    }
}
typeWriter();
const sections = document.querySelectorAll(".section")
  , options = {
    root: null,
    threshold: .5
};
let observer = new IntersectionObserver(((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.dataset.index, 10);
            
            // Check if the section index is different from the current message index
            if (sectionIndex !== currentMessageIndex) {
                currentMessageIndex = sectionIndex;
                i = 0;
                currentText = messages[currentMessageIndex];
                animatedText.innerHTML = "";
                typeWriter();
                currentButtonMessageIndex = currentMessageIndex;
                updateButtonMessage();
                updateButtonVisibility();
            }
        }
    });
}), options);
function scrollToNextSection() {
    return new Promise((e=>{
        const t = document.querySelector(`.section:nth-child(${currentButtonMessageIndex + 2})`)
          , o = window.innerHeight / 2 - t.offsetHeight / 2
          , n = t.getBoundingClientRect().top + window.pageYOffset - o;
        window.scrollTo({
            top: n,
            behavior: "smooth"
        }),
        setTimeout((()=>{
            e()
        }
        ), 1e3)
    }
    ))
}
function updateButtonMessage() {
    currentButtonMessageIndex < buttonMessages.length ? (scrollBtn.textContent = buttonMessages[currentButtonMessageIndex],
    scrollBtn.style.display = "block") : scrollBtn.style.display = "none"
}
function navigateWithFade(e) {
    document.body.classList.add("fade-out"),
    setTimeout((()=>{
        window.location.href = e
    }
    ), 1e3)
}
function scrollToSignUp() {
    const e = document.getElementById("section08");
    window.scrollTo({
        top: e.offsetTop,
        behavior: "smooth"
    })
}

function scrollToStart() {
return new Promise((e=>{
        const t = document.querySelector(`.section:nth-child(${currentButtonMessageIndex + 2})`)
          , o = window.innerHeight / 2 - t.offsetHeight / 2
          , n = t.getBoundingClientRect().top + window.pageYOffset - o;
        window.scrollTo({
            top: n,
            behavior: "smooth"
        }),
        setTimeout((()=>{
            e()
        }
        ), 1e3)
    }
    ))
}
sections.forEach((e=>{
    observer.observe(e)
}
)),
scrollBtn.addEventListener("click", (()=>{
    console.log("Button clicked"),
    scrollToNextSection().then((()=>{
        updateButtonVisibility()
    }
    ))
}
)),
/* signupBtn.addEventListener("click", (()=>{
    console.log("Button clicked"),
    scrollToSignUp()
}
)), */
    
startBtn.addEventListener("click", (()=>{
    console.log("Button clicked"),
    scrollToStart()
}
)),    
document.addEventListener("DOMContentLoaded", (()=>{
    document.querySelectorAll(".navlink").forEach((e=>{
        e.addEventListener("click", (function(t) {
            t.preventDefault();
            document.querySelector(e.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        }
        ))
    }
    ))
}
)),
document.addEventListener("DOMContentLoaded", (function() {
    var e = (new Date).getFullYear();
    document.getElementById("year").innerHTML = e
}
));
