const btns = document.getElementsByClassName('submit');
const backs = document.getElementsByClassName('back');
const prices = document.getElementsByClassName('price');
const tally = document.getElementById('tally');
const paras = tally.getElementsByTagName('p');
const tallyP = paras[paras.length - 1];
const newPara = document.createElement('p');
const node = document.createTextNode("");
newPara.appendChild(node);
const sections = document.getElementsByClassName('section-card');
const submit2 = document.getElementById("submit2");

function CInputs() {
    const ch = [];
    const visible = document.getElementsByClassName("visible")[0];
    const inputs = visible.getElementsByTagName('input');

    for (let chkd = 0; chkd < inputs.length; chkd++) {
        if (inputs[chkd].checked) {
            ch.push(inputs[chkd]);
        }
    }
    return ch;
}

function finalTally() {
    const total = (totalPrice) => {
        const totalT = document.getElementById('total');
        totalT.innerHTML = `Total to be paid: <span class='dollar'>$${totalPrice}<span>`;
    }

    const visible = document.getElementsByClassName('visible')[0];
    const paraContent = [];

    visible.classList.remove('visible');
    tally.setAttribute('id', 'finaltally');
    tally.getElementsByTagName('h1')[0].setAttribute('id', 'yourOrder');
    createPara('id', 'total');

    for (let i = 0; i < paras.length - 1; i++) {
        paraContent.push(paras[i].textContent);
    }

    const paraSplit = [];
    for (let s = 0; s < paraContent.length; s++) {
        paraSplit[s] = paraContent[s].split(' $');
    }

    let totalPrice = 0;
    for (let p = 0; p < paras.length - 1; p++) {
        paras[p].innerHTML = `${paraSplit[p][0]} <span class='dollar'>$${paraSplit[p][1]}</span>`;
        totalPrice += Number(paraSplit[p][1]);
    }

    const chngO = () => {
        document.getElementsByClassName('first')[0].classList.add('visible');
        document.getElementById('finaltally').setAttribute('id', 'tally');
        document.getElementById('tally').innerHTML = "<h1>Your order</h1>";
        document.getElementById('mainh2').setAttribute('id', 'mainh1');
    }

    const chng1 = () => {
        const ft = document.getElementById('finaltally');
        while (ft.firstChild) {
            ft.removeChild(ft.firstChild);
        }

        const message = document.createElement("h1");
        const messageText = document.createTextNode("Your order has been successfully submitted.");
        message.setAttribute("id", "yourOrder2");
        message.style.fontFamily = "sans-serif";
        message.appendChild(messageText);
        ft.appendChild(message);

        const newOrderBtn = document.createElement("button");
        newOrderBtn.textContent = "New Order";
        newOrderBtn.addEventListener("click", chngO);
        newOrderBtn.style.cssFloat = "left";
        ft.appendChild(newOrderBtn);
    }

    total(totalPrice);

    document.getElementById('mainh1').setAttribute('id', 'mainh2');

    const lbtn = document.createElement('button');
    lbtn.textContent = 'Change order';
    lbtn.style.fontSize = '1rem';
    lbtn.style.textAlign = 'center';
    const lastwindow = document.getElementById('finaltally');
    lastwindow.appendChild(lbtn);
    lbtn.style.cssFloat = 'right';
    lbtn.addEventListener('click', chngO);

    const rbtn = document.createElement('button');
    rbtn.textContent = 'Submit order';
    rbtn.style.fontSize = '1rem';
    rbtn.style.textAlign = 'center';
    rbtn.style.cssFloat = 'left';
    lastwindow.appendChild(rbtn);
    rbtn.addEventListener('click', chng1);
}

function createPara(attrib, avalue) {
    const newPara = document.createElement('p');
    const node = document.createTextNode("");
    newPara.setAttribute(attrib, avalue);
    newPara.appendChild(node);
    tally.appendChild(newPara);
}

function check() {
    let ch = 0;
    const visible = document.getElementsByClassName("visible")[0];
    const inputs = visible.getElementsByTagName('input');

    for (let chkd = 0; chkd < inputs.length; chkd++) {
        if (inputs[chkd].checked) {
            ch += 1;
        }
    }
    return ch;
}

function nextS() {
    for (let i = 0; i < sections.length - 1; i++) {
        if (sections[i].classList.contains('visible')) {
            sections[i].classList.remove('visible');
            sections[i + 1].classList.add('visible');
            break;
        }
    }
}

function next() {
    const visible = document.getElementsByClassName("visible")[0];
    const inputs = visible.getElementsByTagName('input');
    const secParas = visible.getElementsByTagName('p');

    if (!visible.classList.contains('last')) {
        if (check() === 0) {
            alert("You have to choose at least one item!");
        } else if (check() === 1) {
            for (let c = 0; c < inputs.length; c++) {
                if (inputs[c].checked && inputs[c].hasAttribute('data-price')) {
                    const ingredients = secParas[c].innerText || secParas[c].textContent;
                    const topay = inputs[c].getAttribute('data-price');
                    createPara('data-name', inputs[c].getAttribute('id'));
                    paras[paras.length - 1].innerHTML = `${ingredients} <span>$${topay}</span>`;
                } else if (inputs[c].checked && !inputs[c].hasAttribute('data-price')) {
                    const ingredients = secParas[c].innerText || secParas[c].textContent;
                    createPara('data-name', secParas[c].getElementsByTagName('input')[0].getAttribute('id'));
                    paras[paras.length - 1].innerHTML = `${ingredients} <span>$1</span>`;
                }
            }
            nextS();
        } else if (check() > 1) {
            for (let j = 0; j < CInputs().length; j++) {
                const ingredients = CInputs()[j].parentElement.innerText || CInputs()[j].parentElement.textContent;
                createPara('data-name', CInputs()[j].getAttribute('id'));
                paras[paras.length - 1].innerHTML = `${ingredients} <span>$${CInputs()[j] === CInputs()[0] ? 2 : 1}</span>`;
            }
            nextS();
        }
    } else {
        if (check() === 0) {
            alert("You have to choose at least one item!");
        } else if (check() === 1) {
            for (let c = 0; c < inputs.length; c++) {
                if (inputs[c].checked && inputs[c].hasAttribute('data-price')) {
                    const ingredients = secParas[c].innerText || secParas[c].textContent;
                    const topay = inputs[c].getAttribute('data-price');
                    createPara('data-name', inputs[c].getAttribute('id'));
                    paras[paras.length - 1].innerHTML = `${ingredients} <span>$${topay}</span>`;
                } else if (inputs[c].checked && !inputs[c].hasAttribute('data-price')) {
                    const ingredients = secParas[c].innerText || secParas[c].textContent;
                    createPara('data-name', secParas[c].getElementsByTagName('input')[0].getAttribute('id'));
                    paras[paras.length - 1].innerHTML = `${ingredients} <span>$1</span>`;
                }
            }
        } else if (check() > 1) {
            for (let j = 0; j < CInputs().length; j++) {
                const ingredients = CInputs()[j].parentElement.innerText || CInputs()[j].parentElement.textContent;
                createPara('data-name', CInputs()[j].getAttribute('id'));
                paras[paras.length - 1].innerHTML = `${ingredients} <span>$${CInputs()[j] === CInputs()[0] ? 2 : 1}</span>`;
            }
        }
        finalTally();
    }
}

function back() {
    const DelFood = () => {
        const secCards = document.getElementsByClassName("section-card");
        const visible = document.getElementsByClassName('visible')[0];

        const prevSection = () => {
            for (let q = 0; q < secCards.length; q++) {
                if (secCards[q] === visible && q > 0) {
                    return q - 1;
                } else if (secCards[q] === visible && q === 0) {
                    return q;
                }
            }
        }

        const prevInputs = sections[prevSection()].getElementsByTagName('input');
        for (let v = 0; v < prevInputs.length; v++) {
            for (let pv = 0; pv < paras.length; pv++) {
                if (prevInputs[v].getAttribute('id') === paras[pv].getAttribute('data-name')) {
                    tally.removeChild(paras[pv]);
                }
            }
        }
    }
    DelFood();

    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains('visible') && !sections[i].classList.contains('first')) {
            sections[i].classList.remove('visible');
            sections[i - 1].classList.add('visible');
            break;
        } else {
            document.getElementsByClassName('first')[0].getElementsByClassName('back')[0].disabled = true;
        }
    }
}

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', next);
    backs[i].addEventListener('click', back);
}
