import { data } from './info.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.info').innerHTML = 
            `<p>`+item.type === 'buy' ? 'For Sale' : 'For Rent' + ` | Code: `+ 
            item.code+` <br>| ` +
            item.title+` <br>| ` +
            item.location+`</p>`;
            document.querySelector('.title').innerHTML = item.title;
            document.querySelector('.description').innerHTML = item.description 
        }
    });
}

function displayImages(item) {
    document.querySelector('.fullHouse.kitchen').src = item.kitchenPhoto;
    document.querySelector('.fullHouse.bath').src = item.bathPhoto;
    document.querySelector('.fullHouse.room').src = item.roomPhoto;
}
const item = data[0]; 
displayImages(item);

document.addEventListener('DOMContentLoaded', () => {
    displayProduct();
});
