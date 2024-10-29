import { data } from './info.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.info').innerHTML = `
                <p>${item.type === 'buy' ? 'For Sale' : 'For Rent'} | Code: ${item.code} <br>| ${item.title} <br>| ${item.location}</p>
            `;
            document.querySelector('.title').innerHTML = item.title;
            document.querySelector('.description').innerHTML = item.description;
            document.querySelector('.kitchen').src = item.kitchenPhoto;
            document.querySelector('.bath').src = item.bathPhoto;
            document.querySelector('.room').src = item.roomPhoto;
        }
    });
}