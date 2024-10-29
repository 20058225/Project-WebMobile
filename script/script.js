import { data } from './data.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.info').innerHTML = `
                <p>${item.type === 'buy' ? 'For Sale' : 'For Rent'} | Code: ${item.code} <br>| ${item.title} <br>| ${item.location}</p>`;
            document.querySelector('.title').innerHTML = item.title;
            document.querySelector('.description').innerHTML = item.description;
            document.querySelector('.kitchen').src = item.kitchenPhoto;
            document.querySelector('.bath').src = item.bathPhoto;
            document.querySelector('.room').src = item.roomPhoto;
        }
    });
}
function loadIndex() {
    let buyHouse = '';
    let rentHouse = '';
    data.forEach((item) => {
        const announcement = `
            <div class="list">
                <a href="./desc.html?id=${item.id}">
                    <div class="list-content">
                        <img src="${item.house}" alt="${item.title}" class="list-image">
                        <div class="list-details">
                            <h6>${item.title}</h6>
                            <p>${item.desc}</p>
                        </div>
                        <div class="carousel">
                            <div class="row icon">
                                <img src="image/bath.png">
                                <p>${item.bath} bath</p>
                            </div>
                            <div class="row icon">
                                <img src="image/bed.png">
                                <p>${item.bed} bed</p>
                            </div>
                            <div class="row icon">
                                <img src="image/sqm.png">
                                <p>${item.sqm} sqm</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
        if (item.type === 'buy') {
            buyHouse += announcement;
        } else if (item.type === 'rent') {
            rentHouse += announcement;
        }
    });
    const announceBuyElement = document.querySelector('.announceBuy');
    const announceRentElement = document.querySelector('.announceRent');

    if (announceBuyElement) announceBuyElement.innerHTML = buyHouse;
    if (announceRentElement) announceRentElement.innerHTML = rentHouse;

    $(document).ready(() => {
        $('.announceBuy').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 2500,
            prevArrow: '.prev-buy',
            nextArrow: '.next-buy'
        });    
        $('.announceRent').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2500,
            prevArrow: '.prev-rent',
            nextArrow: '.next-rent'
        });
        $('.photosHouse').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: '.prev',
            nextArrow: '.next'
        });
    });    
}
document.addEventListener('DOMContentLoaded', () => {
    loadIndex();
    displayProduct();
});
