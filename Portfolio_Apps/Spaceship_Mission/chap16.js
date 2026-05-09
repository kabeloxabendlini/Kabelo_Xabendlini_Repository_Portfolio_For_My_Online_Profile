var storyEl   = document.getElementById("story");
var questionEl = document.getElementById("question");
var optionsEl  = document.getElementById("options");
var errEl      = document.getElementById("errorMsg");
var progEl     = document.getElementById("prog");
var footerEl   = document.getElementById("siteFooter");

// Step definitions — each has a question, button labels, progress %, and a handler
var steps = [
    {
        q: "Are you ready to begin your mission?",
        opts: ["Yes, let's go!", "No"],
        prog: 10,
        handle: function(v) {
            if (v === "YES, LET'S GO!" || v === "YES") {
                showStory("answer01", 1); return true;
            }
            if (v === "NO") {
                showStory("answer02", 0); return true;
            }
            return false;
        },
        errMsg: "Please answer Yes or No."
    },
    {
        q: "Go to Mars, or stay home?",
        opts: ["Go to Mars", "Stay Home"],
        prog: 40,
        handle: function(v) {
            if (v === "GO TO MARS") { showStory("answer11", 2); return true; }
            if (v === "STAY HOME")  { showStory("answer12", null); return true; }
            return false;
        },
        errMsg: "Please choose 'Go to Mars' or 'Stay Home'."
    },
    {
        q: "Risk it, or go home?",
        opts: ["Risk It", "Go Home"],
        prog: 70,
        handle: function(v) {
            if (v === "RISK IT")  { showStory("answer21", null); return true; }
            if (v === "GO HOME")  { showStory("answer22", null); return true; }
            return false;
        },
        errMsg: "Please choose 'Risk It' or 'Go Home'."
    }
];

var currentStep = 0;

function renderStep(i) {
    currentStep = i;
    var s = steps[i];
    questionEl.textContent = s.q;
    progEl.style.width = s.prog + "%";
    errEl.classList.add("hidden");
    optionsEl.innerHTML = "";

    s.opts.forEach(function(label) {
        var btn = document.createElement("button");
        btn.className = "opt-btn";
        btn.textContent = label;
        btn.addEventListener("click", function() {
            handleChoice(label.toUpperCase());
        });
        optionsEl.appendChild(btn);
    });
}

function handleChoice(val) {
    var s = steps[currentStep];
    var ok = s.handle(val);
    if (!ok) {
        errEl.textContent = s.errMsg;
        errEl.classList.remove("hidden");
    }
}

function showStory(partId, nextStep) {
    var part = document.getElementById(partId);
    storyEl.innerHTML = part ? part.innerHTML : "";
    storyEl.scrollTop = 0;

    if (nextStep === null) {
        theEnd();
    } else {
        renderStep(nextStep);
    }
}

function theEnd() {
    progEl.style.width = "100%";
    storyEl.innerHTML += "<div class='the-end'><div class='rocket'>🚀</div><div class='end-title'>The End</div><div class='end-sub'>Thanks for playing, Captain!</div></div>";
    footerEl.classList.add("hidden");
}

// Start
renderStep(0);