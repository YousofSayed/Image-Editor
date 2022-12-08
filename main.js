//============= Start Varibals =============
let leftSide = document.querySelector('.parent .left'),
    uploadingArea = document.querySelector('.parent .imge'),
    inputsRange = document.querySelector('.parent .container .right'),
    inputFile = document.getElementById('file'),
    uploadBtn = document.getElementById('upload'),
    uploadBtn2 = document.getElementById('upload2'),
    download = document.getElementById('download'),
    form = document.getElementById('form'),
    throwDown = document.getElementById('throwDown'),
    reset = document.getElementById('reset'),
    data,
    canvas,
    ctx,
    a,
    source,
    inputs = document.querySelectorAll('form input'),
    nums = document.querySelectorAll('form .row span');


//============= End Varibals ===============
let img = document.createElement('img');
img.id = 'img';
uploadingArea.appendChild(img);

//===============Start Creating Functions Area===============
function createCanvas() {
    //Start Creating The Canvas 
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas)
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    img.addEventListener('load', (e) => {
        ctx.filter =
            `blur(${inputs[0].value}px) grayscale(${inputs[1].value}%)
        brightness(${inputs[2].value}%) opacity(${inputs[3].value}%)
        hue-rotate(${inputs[4].value}deg) invert(${inputs[5].value}%)
        saturate(${inputs[6].value}%) sepia(${inputs[7].value}%) contrast(${inputs[8].value})
        `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);


    })
    //End Creating The Canvas
}
function upLoadButton() {
    uploadBtn.remove()
    uploadBtn2.style.display = `block`
}
//===============End Creating Functions Area=================

console.log(inputsRange);
inputs.forEach((e) => {
    e.value = 0;
})
inputs[2].value = 100;
inputs[3].value = 100;
inputs[6].value = 100;
inputs[8].value = 1;

reset.addEventListener('click', (e) => {
    e.preventDefault();
    inputs.forEach((e) => {
        e.value = 0;
    })
    inputs[2].value = 100;
    inputs[3].value = 100;
    inputs[6].value = 100;
    inputs[8].value = 1;
    for (let i = 0; i < inputs.length; i++) {
        nums[i].textContent = inputs[i].value + '%';
    }
    img.style.filter =
        `blur(${inputs[0].value}px) grayscale(${inputs[1].value}%)
        brightness(${inputs[2].value}%) opacity(${inputs[3].value}%)
        hue-rotate(${inputs[4].value}deg) invert(${inputs[5].value}%)
        saturate(${inputs[6].value}%) sepia(${inputs[7].value}%) contrast(${inputs[8].value})
        `;

})

for (let i = 0; i < inputs.length; i++) {
    nums[i].textContent = inputs[i].value + '%';
}


// Start Drag And Drop
uploadingArea.addEventListener('dragover', (e) => {
    e.preventDefault()

})

uploadingArea.addEventListener('drop', (e) => {
    e.preventDefault();
    inputsRange.style.cssText = 'display:flex';
    uploadingArea.style.height = `100%`
    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0])
    reader.addEventListener('load', (e) => {
        img.src = reader.result;
    })
    uploadingArea.classList.add('active');
    upLoadButton()
    createCanvas()
})
// End Drag And Drop
uploadingArea.addEventListener('click', () => {
    inputFile.click();

})
uploadBtn2.addEventListener('click', () => {
    inputFile.click();
})

throwDown.addEventListener('click', () => {
    throwDown.classList.toggle('active')
    form.classList.toggle('active')
})



//Start Upload The Image
inputFile.addEventListener('change', () => {

    inputsRange.style.cssText = 'display:flex';
    uploadingArea.style.height = `100%`
    const reader = new FileReader();
    reader.readAsDataURL(inputFile.files[0]);
    reader.addEventListener('load', (e) => {
        img.src = reader.result;
    })
    upLoadButton()
    createCanvas()

})
//End Upload Image



// Start Filtring The Image
inputs.forEach((e) => {
    e.addEventListener('input', () => {
        img.style.filter =
            `blur(${inputs[0].value}px) grayscale(${inputs[1].value}%)
        brightness(${inputs[2].value}%) opacity(${inputs[3].value}%)
        hue-rotate(${inputs[4].value}deg) invert(${inputs[5].value}%)
        saturate(${inputs[6].value}%) sepia(${inputs[7].value}%) contrast(${inputs[8].value})
       `;
        for (let i = 0; i < inputs.length; i++) {
            nums[i].textContent = inputs[i].value + '%';
        }
    })
})
// End Filtring The Image


// Start Download Image !!!
download.addEventListener('click', (e) => {
    e.preventDefault();
    canvas.width = uploadingArea.offsetWidth;
    canvas.height = uploadingArea.offsetHeight;
    ctx.filter =
        `blur(${inputs[0].value}px) grayscale(${inputs[1].value}%)
        brightness(${inputs[2].value}%) opacity(${inputs[3].value}%)
        hue-rotate(${inputs[4].value}deg) invert(${inputs[5].value}%)
        saturate(${inputs[6].value}%) sepia(${inputs[7].value}%) contrast(${inputs[8].value})
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    data = canvas.toDataURL('image/jpeg');
    a = document.createElement('a');
    a.href = data;
    a.download = 'photo.jpeg';
    document.body.appendChild(a);
    a.click()
})
// End Download Image !!!






