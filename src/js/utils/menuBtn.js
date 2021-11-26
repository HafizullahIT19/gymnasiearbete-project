
// To top button
console.log('js/utils/menuBtn.js');

const menu = document.querySelector('#menu');
const menuBtn = document.querySelector('#dropDownMenuBtn');
const closeMenuBtn = document.querySelector('#closeMenuBtn');


// console.log('Hellooooooooo');
// console.log(menuBtn.classList.value);

menuBtn.addEventListener('click',function(){
    menu.classList.add('menuActive')

})

closeMenuBtn.addEventListener('click',function(){
    menu.classList.remove('menuActive')
})


    
