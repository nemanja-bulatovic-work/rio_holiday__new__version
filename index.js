var PlxItems = {};

// config params that need to be aligned with css
var Config = {
    // bottom css attribute (px)
    HEAD_START: 5,
    HEAD_TOP_OFFSET: 0,
    //second-page start
    PAGE_START: 0,
    PAGE_OFFSET: -300 ,
    // translate attribute
    NAV_START: 0,
    NAV_OFFSET: -500,
    // translate attribute
    IMG_1_START: 0,
    IMG_1_MAX_OFFSET: -100,
    // translate attribute
    IMG_2_START: 0,
    IMG_2_MAX_OFFSET: -100,
    // translate attribute
    IMG_3_START: 0,
    IMG_3_MAX_OFFSET: -400,
    // translate attribute
    IMG_4_START: 0,
    IMG_4_MAX_OFFSET: -700,
    // margin-top attribute (in vw)
    IMG_5_START: -900,
    IMG_5_MAX_OFFSET: 0,
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
        nav: {
            element: document.querySelector(".nav"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img1: {
            element: document.querySelector(".background_2"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img2: {
            element: document.querySelector(".background_2"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img3: {
            element: document.querySelector(".background_3"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img4: {
            element: document.querySelector(".background_4"),
            setter: (elem, value) => elem.style.transform = `translateY(-${ value }px)`,
        },
        img5: {
            element: document.querySelector(".background_5"),
            setter: (elem, value) => elem.style.marginTop = `-${ value }px`,
        },
    }
}

function updateHead(plxFactor) {
    const maxOffset = windowHeight() - getHeight(PlxItems.firstHead.element) - Config.HEAD_TOP_OFFSET - Config.HEAD_START;
    const nextValue = Config.HEAD_START + plxFactor * maxOffset;
    SET(PlxItems.firstHead, nextValue);
    SET(PlxItems.secondHead, nextValue);
}

function updateNav(plxFactor) {
    const maxOffset = windowHeight() - getHeight(PlxItems.firstHead.element) - Config.NAV_OFFSET - Config.NAV_START;
    const nextValue = Config.NAV_START + plxFactor * maxOffset
    SET(PlxItems.nav, nextValue);
}

function updateImgs(plxFactor) { 
    const nextImg1Value = Config.IMG_1_START - plxFactor * Config.IMG_1_MAX_OFFSET;
    const nextImg2Value = Config.IMG_2_START - plxFactor * Config.IMG_2_MAX_OFFSET;
    const nextImg3Value = Config.IMG_3_START - plxFactor * Config.IMG_3_MAX_OFFSET;
    const nextImg4Value = Config.IMG_4_START - plxFactor * Config.IMG_4_MAX_OFFSET;
    const nextImg5Value = Config.IMG_5_START - plxFactor * Config.IMG_5_MAX_OFFSET;
    SET(PlxItems.img1, nextImg1Value);
    SET(PlxItems.img2, nextImg2Value);
    SET(PlxItems.img3, nextImg3Value);
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
    if(document.querySelector('.first__page').offsetHeight === window.scrollY){
        document.querySelector('.second__page').style.overflowY = "scroll"
    }else{
        document.querySelector('.second__page').style.overflowY = "hidden"
    }
    const MAX_SCROLL = getMaxScroll();
    const plxFactor =  window.scrollY / MAX_SCROLL;
    const plxFactorImg =  window.scrollY / window.innerHeight;
    updateHead(plxFactor)
    updateNav(plxFactor)
    updateImgs(plxFactorImg) 
});

setTimeout(function(){
    document.getElementById('bg-change').setAttribute("class", "first__page sepia-color");
},100);

setTimeout(function(){
    document.getElementById('secondwordnav').setAttribute("class", "second active-2");
},300);

setTimeout(function(){
    document.getElementById('thirdwordnav').setAttribute("class", "third active-2");
},310);

setTimeout(function(){
    document.getElementById('firstwordnav').setAttribute("class", "first active");
},550);

setTimeout(function(){
    document.getElementById("first-rio").setAttribute("class", "page__head__text active");
},560);

setTimeout(function(){
    document.getElementById("bgimages").setAttribute("class", "background active-3");
    document.body.style.overflowY = "scroll";
    setPlxItems();
}, 570);



