const messages = ["👋 Welkom! Ik ben Caleb. Uw virtuele assistent.\n\nIk ben hier om jouw organisatie veiliger te maken en te helpen bij de voorbereiding op de nieuwe NIS2-wetgeving.",
    "Voordat we uw beveiligingsbeleid bespreken, willen we graag het domeinnaam van uw organisatie weten. Hierdoor kunnen we in een latere stap het aanvalsoppervlak in kaart te brengen. \n\nWe verzekeren u dat deze scan geen gevoelige gegevens verzamelt. Dank u voor uw medewerking!",
    "De volgende vragen geven ons een inzicht in de huidige situatie binnen uw organisatie. Geeft u alstublieft antwoorden op de vragen middels de onderstaande knoppen.",
    "Uw uitslag is bekend, Wilt u meer informatie rondom de NIS2? Laat dan uw emailadres achter zodat mijn collegas contact met u kunnen opnemen!",
    "na vragenlijst",
    "",
    "",
    ""];

let i = 0;
let customerdomain = "";
const questionscount = 13;
let currentText = messages[0];
let sectionIndex;
const animatedText = document.getElementById('animated-text');
const scrollBtn = document.getElementById('scroll-btn');
const signupBtn = document.getElementById('signup');
const yesBtn = document.getElementById("yes-button");
const noBtn = document.getElementById("no-button");
scrollBtn.style.display = 'none';
const buttonMessages = ['Klik hier!', 'Start de scan'];
let currentButtonMessageIndex = 0;
const glow = document.querySelector('.glow');

let passed = 1;




let glowSize = 4;

var bar = new ProgressBar.Line(pgline, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#d4a0f6',
    trailColor: '#dac1f1',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    from: { color: '#d4a0f6' },
    to: { color: '#6a35fb' },
    step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
    }
});

function updateLogoGlow() {
    if (i < currentText.length) {
        glowSize += 0.2;
        if (glowSize > 12) {
            glowSize = 4;
        }
        glow.style.boxShadow = `0 0 ${glowSize}px ${glowSize / 2}px #2A47D9`;
        glow.style.opacity = 1;
    } else {
        glow.style.opacity = 0;
    }
}

function typeWriter() {
    if (i < currentText.length) {
        animatedText.innerHTML += currentText.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
        updateLogoGlow();
    } else {
        updateButtonMessage();
        updateButtonVisibility(); // Call updateButtonVisibility() here
    }
}

typeWriter(); // Call the function on page load


function updateButtonVisibility() {
    if (i < currentText.length || currentButtonMessageIndex >= buttonMessages.length) {
        scrollBtn.style.display = 'none';
    } else {
        scrollBtn.style.display = 'block';
    }
}



const sections = document.querySelectorAll('.section');
const options = {
    root: null,
    threshold: 0.5,
};

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sectionIndex = parseInt(entry.target.dataset.index, 10);
            if (currentText !== messages[sectionIndex]) {
                i = 0;
                currentText = messages[sectionIndex];
                animatedText.innerHTML = "";
                typeWriter();
                currentButtonMessageIndex = sectionIndex;
                updateButtonMessage();
                updateButtonVisibility(); // Call updateButtonVisibility() here
                toggleButtonsVisibility();
                console.log(sectionIndex);
            }
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


//Scrolling from one section to the next
function scrollToNextSection() {
    return new Promise(resolve => {
        const nextSection = document.querySelector(`.section:nth-child(${currentButtonMessageIndex + 2})`);
        const yOffset = window.innerHeight / 2 - nextSection.offsetHeight / 2;
        const y = nextSection.getBoundingClientRect().top + window.pageYOffset - yOffset;

        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });

        // Wait for scrolling to complete
        setTimeout(() => {
            resolve();
        }, 1000);
    });

}




// Update the button to the new text for each section
function updateButtonMessage() {
    if (currentButtonMessageIndex < buttonMessages.length) {
        scrollBtn.textContent = buttonMessages[currentButtonMessageIndex];
        scrollBtn.style.display = 'block';
    } else {
        scrollBtn.style.display = 'none';
    }
}
scrollBtn.addEventListener('click', () => {
    console.log('Button clicked');
    if (currentButtonMessageIndex > 0) {
        console.log("buttonindx: " + currentButtonMessageIndex);
        let x = document.getElementById("domainval").value;
        customerdomain = x;
        invalidDomainRegex = /^((?!(([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.+[a-zA-Z]{2,})).)*$/;

        // If x is Not a Number or less than one or greater than 10
        let text;
        if (invalidDomainRegex.test(x) && x !== "") {
            text = "Voer aub een geldig domein in.";
            console.log("invalid")
            getdomains();
            document.getElementById("demo").innerHTML = text;
        } else {
            text = "";
            console.log("valid")
            scrollToNextSection().then(() => {
                updateButtonVisibility();
            });
            document.getElementById("demo").innerHTML = text;
            var T = document.getElementById("section03");
            T.style.display = "block";  // <-- Set it to block
        }

    }
    else {
        scrollToNextSection().then(() => {
            updateButtonVisibility();
        });
    }

});


function showLoader() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("goed").style.display = "none";
    document.getElementById("fout").style.display = "none";  

    setTimeout(function () {
      
        if (passed === 0){
        document.getElementById("loader").style.display = "none";
        document.getElementById("fout").style.display = "block";
        }
        else {
        document.getElementById("loader").style.display = "none";
        document.getElementById("goed").style.display = "block";
        }
      console.log("Done"); 
    }, 4000); 
  }

noBtn.addEventListener('click', () => {
    console.log("qi" + questionIndex);
    console.log("si" + sectionIndex);
    passed = 0;
    if (sectionIndex === 2 && questionIndex < 13) {
        let barstat = (1 / 13) * questionIndex;
        questionIndex++;
        // fade out
        // and wait for animation to finish
        $("#div1").fadeOut().promise()

            // once finished, execute the following function
            .done(function () {
                // copy HTML
                $("#div1").html($("#div" + questionIndex).html())
                    // fade in
                    .fadeIn();
            });
        bar.animate(barstat);

    }
    else {
        let barstat = (1 / 13) * questionIndex;
        bar.animate(barstat);

        var T = document.getElementById("section04");
        T.style.display = "block";  // <-- Set it to block

        scrollToNextSection().then(() => {
            updateButtonVisibility();         
        });

        showLoader();
    }
});

let questionIndex = 1;

yesBtn.addEventListener('click', () => {
    console.log("qi" + questionIndex);
    console.log("si" + sectionIndex);
    if (sectionIndex === 2 && questionIndex < 13) {
        let barstat = (1 / 13) * questionIndex;
        questionIndex++;
        // fade out
        // and wait for animation to finish
        $("#div1").fadeOut().promise()

            // once finished, execute the following function
            .done(function () {
                // copy HTML
                $("#div1").html($("#div" + questionIndex).html())
                    // fade in
                    .fadeIn();
            });
        bar.animate(barstat);

    }
    else {
        let barstat = (1 / 13) * questionIndex;
        bar.animate(barstat);

        var T = document.getElementById("section04");
        T.style.display = "block";  // <-- Set it to block

        scrollToNextSection().then(() => {
            updateButtonVisibility();
        });

        showLoader();
    }
});


function navigateWithFade(url) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = url;
    }, 1000);
}

function scrollToSignUp() {
    const lastSection = document.getElementById('section08');

    window.scrollTo({
        top: lastSection.offsetTop,
        behavior: 'smooth'
    });
}



document.addEventListener('DOMContentLoaded', () => {
    // Add an event listener for the navigation links
    document.querySelectorAll('.navlink').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    var currentYear = new Date().getFullYear();
    document.getElementById("year").innerHTML = currentYear;
});

function toggleButtonsVisibility() {
    const section03 = document.getElementById("section03");
    yesButton = document.getElementById("yes-button");
    noButton = document.getElementById("no-button");

    if (section03) {
        const section03Rect = section03.getBoundingClientRect();
        if (section03Rect.top <= window.innerHeight && currentButtonMessageIndex > 1) {

            yesButton.style.display = "block";
            noButton.style.display = "block";
        } else {
            yesButton.style.display = "none";
            noButton.style.display = "none";
        }
    }
}

function getdomains() {
    const url = 'https://crt.sh/atom?q=bdo.nl';

    fetch(url)
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

            const entries = xmlDoc.querySelectorAll('entry');
            const numSubdomainsToExtract = 5;
            const extractedSubdomains = [];

            entries.forEach((entry, index) => {
                const summary = entry.querySelector('summary[type="html"]').textContent;
                const subdomainMatch = summary.match(/<summary type="html">([^<]+)<\/summary>/);

                if (subdomainMatch) {
                    const subdomain = subdomainMatch[1].trim();
                    extractedSubdomains.push(subdomain);

                    if (extractedSubdomains.length >= numSubdomainsToExtract) {
                        return;
                    }
                }
            });

            extractedSubdomains.forEach((subdomain, index) => {
                console.log(`Subdomain #${index + 1}: ${subdomain}`);
            });
        })
        .catch(error => {
            console.error('Error fetching XML data:', error);
        });


}

