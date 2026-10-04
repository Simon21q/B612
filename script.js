const starsContainer = document.getElementById("stars");

const numberOfStars = 100;

for (let i = 0; i < numberOfStars; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    const x = Math.random() * 100;
    const y = Math.random() * 100;

    const size = Math.random() * 2 + 1;

    const duration = Math.random() * 4 + 3;
    const delay = Math.random() * 5;

    star.style.left = `${x}%`;
    star.style.top = `${y}%`;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    starsContainer.appendChild(star);
}
const startButton = document.getElementById("startButton");

const welcomeScene = document.getElementById("welcomeScene");
const planetScene = document.getElementById("planetScene");
const foxScene = document.getElementById("foxScene");
const roseScene = document.getElementById("roseScene");
const lampScene = document.getElementById("lampScene");
const letters = document.querySelectorAll(".letter");
const letterOverlay = document.getElementById("letterOverlay");
const closeLetter = document.getElementById("closeLetter");
const letterContent = document.getElementById("letterContent");
const letterData = {
    1: {
        number: "LETTRE · 01",
        title: "给今天很累的你。",
        french: "Pour toi, après une longue journée.",
        image: "images/letter-01.jpg"
    },

    2: {
        number: "LETTRE · 02",
        title: "有些话，狐狸替我们记得。",
        french: "Il y a des choses que le renard garde pour nous.",
        image: "images/letter-02.jpg"
    },

    3: {
        number: "LETTRE · 03",
        title: "留给某一天的你。",
        french: "Pour toi, un autre jour.",
        image: "images/letter-03.jpg"
    }
};
letters.forEach(function (letter) {

    letter.addEventListener("click", function () {

        const number = letter.dataset.letter;
        const data = letterData[number];

        letterContent.innerHTML = `
    <p class="letter-number">${data.number}</p>

    <h2>${data.title}</h2>

    <p class="letter-french">
        ${data.french}
    </p>

    <div class="letter-image-wrap">
        <img
            src="${data.image}"
            alt="${data.title}"
            class="letter-image"
        >
    </div>
`;
        letterOverlay.classList.add("open");

    });

});
closeLetter.addEventListener("click", function () {

    letterOverlay.classList.remove("open");

});
letterOverlay.addEventListener("click", function (event) {

    if (event.target === letterOverlay) {
        letterOverlay.classList.remove("open");
    }

});

const foxPlace = document.querySelector(".fox-place");
const foxBackButton = document.getElementById("foxBackButton");
const rosePlace = document.querySelector(".rose-place");
const lampPlace = document.querySelector(".lamp-place");
const lampBackButton = document.getElementById("lampBackButton");

const lampWorld = document.querySelector(".lamp-world");
const lampMessage = document.getElementById("lampMessage");
const restButton = document.getElementById("restButton");
const goodnightMessage = document.getElementById("goodnightMessage");
const stayButton = document.getElementById("stayButton");
const lampEnding = document.getElementById("lampEnding");
const roseBackButton = document.getElementById("roseBackButton");
const plantButton = document.getElementById("plantButton");

const roseModal = document.getElementById("roseModal");
const closeRoseModal = document.getElementById("closeRoseModal");

const roseText = document.getElementById("roseText");
const saveRose = document.getElementById("saveRose");
const garden = document.getElementById("garden");
const emptyGarden = document.getElementById("emptyGarden");


let roses = JSON.parse(localStorage.getItem("b612Roses")) || [];


function showScene(scene) {

    const allScenes = document.querySelectorAll(".scene");

    allScenes.forEach(function (currentScene) {
        currentScene.classList.remove("active");
    });

    scene.classList.add("active");
}


startButton.addEventListener("click", function () {
    showScene(planetScene);
});


foxPlace.addEventListener("click", function () {

    // 第一阶段：B612 向镜头扑来
    planetScene.classList.add("landing");

    // 第二阶段：接近大气层，画面开始失焦 + 过曝
    setTimeout(function () {
        planetScene.classList.add("landing-final");
    }, 1350);

    // 第三阶段：穿过大气层，进入狐狸场景
    setTimeout(function () {

        showScene(foxScene);

        // 恢复 B612，保证以后返回还能再次播放
        setTimeout(function () {
            planetScene.classList.remove("landing");
            planetScene.classList.remove("landing-final");
        }, 100);

    }, 1700);

});


foxBackButton.addEventListener("click", function () {
    showScene(planetScene);
});
rosePlace.addEventListener("click", function () {

    // 第一阶段：玫瑰花瓣从 B612 表面升起
    planetScene.classList.add("rose-flight");

    // 第二阶段：等待花瓣掠过镜头
    setTimeout(function () {

        showScene(roseScene);

        // 恢复 B612
        setTimeout(function () {
            planetScene.classList.remove("rose-flight");
        }, 100);

    }, 1750);

});


roseBackButton.addEventListener("click", function () {
    showScene(planetScene);
});
plantButton.addEventListener("click", function () {

    roseModal.classList.add("open");

    roseText.focus();

});


closeRoseModal.addEventListener("click", function () {

    roseModal.classList.remove("open");

});
function renderRoses(animateNewest = false) {

    const oldRoses = garden.querySelectorAll(".planted-rose");

    oldRoses.forEach(function (rose) {
        rose.remove();
    });


    if (roses.length === 0) {

        emptyGarden.style.display = "block";

        return;
    }


    emptyGarden.style.display = "none";


    roses.forEach(function (roseData, index) {

        const rose = document.createElement("div");

        rose.classList.add("planted-rose");

        const isNewest = animateNewest && index === roses.length - 1;

rose.innerHTML = `
    <div class="rose-flower ${isNewest ? "growing" : ""}">🌹</div>
    <span>${roseData.date}</span>
`;


        const spacing = 100 / (roses.length + 1);

        rose.style.left = `${spacing * (index + 1)}%`;


        rose.addEventListener("click", function () {

            const shouldDelete = confirm(
                roseData.date +
                "\n\n" +
                roseData.text +
                "\n\n要移除这朵玫瑰吗？"
            );


            if (shouldDelete) {

                roses.splice(index, 1);

                localStorage.setItem(
                    "b612Roses",
                    JSON.stringify(roses)
                );

                renderRoses(true);
            }

        });


        garden.appendChild(rose);

    });

}
saveRose.addEventListener("click", function () {

    const text = roseText.value.trim();


    if (text === "") {
        return;
    }


    const today = new Date();

    const date = today.toLocaleDateString("zh-CN");


    const newRose = {
        text: text,
        date: date
    };


    roses.push(newRose);


    localStorage.setItem(
        "b612Roses",
        JSON.stringify(roses)
    );


    roseText.value = "";

    roseModal.classList.remove("open");


    renderRoses();

});
renderRoses();
lampPlace.addEventListener("click", function () {

    // 第一阶段：B612 的天空慢慢进入黄昏
    planetScene.classList.add("lamp-transition");

    // 第二阶段：远处的灯亮起
    setTimeout(function () {
        planetScene.classList.add("lamp-light");
    }, 900);

    // 第三阶段：进入点灯人的世界
    setTimeout(function () {

        showScene(lampScene);

        // 恢复 B612，保证返回后还能重新播放
        setTimeout(function () {
            planetScene.classList.remove("lamp-transition");
            planetScene.classList.remove("lamp-light");
        }, 100);

    }, 1800);

});


lampBackButton.addEventListener("click", function () {
    showScene(planetScene);
});
restButton.addEventListener("click", function () {

    // 1. 熄灯
    lampWorld.classList.add("resting");

    restButton.classList.add("fade-away");


    // 2. 灯灭一会儿后，出现第一句话
    setTimeout(function () {

        lampMessage.innerHTML = `
            <p>今天的灯，就点到这里吧。</p>
            <span>Pour aujourd'hui, laissons la lampe se reposer.</span>
        `;

    }, 900);


    // 3. 再过一会儿，出现晚安
    setTimeout(function () {

        goodnightMessage.classList.add("show");

    }, 2200);


    // 4. 最后出现“坐一会儿”
    setTimeout(function () {

        stayButton.classList.add("show");

    }, 3600);

});
stayButton.addEventListener("click", function () {

    lampEnding.classList.add("silent");

});
// ==============================
// B612 菜单：鼠标滚轮切换
// ==============================

const b612Places = document.querySelectorAll("#planetScene .place");
const b612Planet = document.querySelector("#planetScene .planet");

let currentPlace = 0;
let wheelLocked = false;

function selectPlace(index) {
    // 限制在 0 ~ 2
    index = Math.max(0, Math.min(index, b612Places.length - 1));

    currentPlace = index;

    b612Places.forEach((place, i) => {
        place.classList.toggle("active", i === currentPlace);
    });
    if (currentPlace === 0) {
    b612Planet.style.transform = "translate(0px, 0px) rotate(0deg)";
}

if (currentPlace === 1) {
    b612Planet.style.transform = "translate(-18px, -10px) rotate(1deg)";
}

if (currentPlace === 2) {
    b612Planet.style.transform = "translate(-32px, -18px) rotate(2deg)";
}
}

window.addEventListener("wheel", (event) => {

    // 只有 B612 场景显示时才响应
    const planetScene = document.querySelector("#planetScene");

    if (!planetScene || !planetScene.classList.contains("active")) {
        return;
    }

    // 防止滚轮一次触发十几次
    if (wheelLocked) return;

    if (event.deltaY > 0) {
        // 向下滚
        selectPlace(currentPlace + 1);
    } else if (event.deltaY < 0) {
        // 向上滚
        selectPlace(currentPlace - 1);
    }

    wheelLocked = true;

    setTimeout(() => {
        wheelLocked = false;
    }, 500);
});