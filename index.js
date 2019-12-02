var PlxItems = {};

// config params that need to be aligned with css
var Config = {
    // bottom css attribute (px)
    HEAD_START: 40,
    HEAD_TOP_OFFSET: 10,
    // margin-top attribute
    IMG_4_START: -70,
    IMG_4_MAX_OFFSET: 60,
    // margin-top attribute (in vw)
    IMG_5_START: -75,
    IMG_5_MAX_OFFSET: 60,
};

function getMaxScroll() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight) - window.innerHeight;
}

function windowHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

function getHeight(elem) {
    return elem.offsetHeight;
}

function setPlxItems() {
    PlxItems = {
        firstHead: {
            element: document.getElementById("first-rio"),
            setter: (elem, value) => elem.style.bottom = `${ value }px`,
        },
        secondHead: {
            element: document.getElementById("second-rio"),
            setter: (elem, value) => elem.style.bottom = `${ value }px`,
        },
        img4: {
            element: document.querySelector(".background_4"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img5: {
            element: document.querySelector(".background_5"),
            setter: (elem, value) => elem.style.marginTop = `-${ value }%`,
        },
    }
}

function updateHead(plxFactor) {
    const maxOffset = windowHeight() - getHeight(PlxItems.firstHead.element) - Config.HEAD_TOP_OFFSET - Config.HEAD_START;
    const nextValue = Config.HEAD_START + plxFactor * maxOffset;
    SET(PlxItems.firstHead, nextValue);
    SET(PlxItems.secondHead, nextValue);
}

function updateImgs(plxFactor) {
    const nextImg4Value = Config.IMG_4_START + window.scrollY/4;
    const nextImg5Value = Config.IMG_5_START + window.scrollY/9; 
    // const nextImg4Value = Config.IMG_4_START - plxFactor * Config.IMG_4_MAX_OFFSET;
    // const nextImg5Value = Config.IMG_5_START - plxFactor * Config.IMG_5_MAX_OFFSET;
    SET(PlxItems.img4, nextImg4Value);
    SET(PlxItems.img5, nextImg5Value);
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

setPlxItems();

const SET = (plxItem, value) => {
    return plxItem.setter(plxItem.element, value);
}

document.addEventListener("scroll", function(e) {
    window.requestAnimationFrame(function(){
        const MAX_SCROLL = getMaxScroll();
        const plxFactor =  window.scrollY / MAX_SCROLL;
        updateHead(plxFactor);
        updateImgs(plxFactor)
    })
   
});

setTimeout(function(){
    document.getElementById('bg-change').setAttribute("class", "first__page sepia-color");
},100);

setTimeout(function(){
    document.getElementById('secondwordnav').setAttribute("class", "second active");
},300);

setTimeout(function(){
    document.getElementById('thirdwordnav').setAttribute("class", "third active");
},310);

setTimeout(function(){
    document.getElementById('firstwordnav').setAttribute("class", "first active");
},480);

setTimeout(function(){
    document.getElementById("first-rio").setAttribute("class", "page__head__text active");
},500);

setTimeout(function(){
    document.getElementById("bgimages").setAttribute("class", "background active-2");
    document.body.style.overflowY = "scroll";
    setPlxItems();
}, 520);

document.getElementsByClassName("example");

