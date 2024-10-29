import { data } from './data.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.title').innerHTML = item.title;
            document.querySelector('.photosHouse').innerHTML = 
                `<div class="carousel-item"><img class="kitchen modal-content" src="${item.kitchenPhoto}" alt="Photo kitchen"> </div>
                <div class="carousel-item"><img class="bath modal-content" src="${item.bathPhoto}" alt="Photo bath"> </div>
                <div class="carousel-item"><img class="room modal-content" src="${item.roomPhoto}" alt="Photo room"> </div>`; 
            document.querySelector('.infoHouse').innerHTML = `
                <h4>${item.type === 'buy' ? 'For Sale' : 'For Rent'} : 
                <b>${item.title}</b> </h4>
                <p>${item.description}${item.moreInfo}</p>
                <p>${item.location}</p>`;
        }
    })
};
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
                            <label>${item.price}</label>
                        </div>
                        <div class="list-room">
                            <div class="icon">
                                <img src="image/bath.png"">
                                <p>${item.bath} bath</p>
                            </div>
                            <div class="icon">
                                <img src="image/bed.png">
                                <p>${item.bed} bed</p>
                            </div>
                            <div class="icon">
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

    $(document).ready(function(){
        $('.photosHouse').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            prevArrow: '.prev',
            nextArrow: '.next'
        });
        $('.announceBuy').slick({
            slidesToShow: 3, 
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            prevArrow: '.prev-buy',
            nextArrow: '.next-buy',
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1 
                }
            }]
        });
    $('.announceRent').slick({
        slidesToShow: 3, 
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        prevArrow: '.prev-rent',
        nextArrow: '.next-rent',
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1 
                }
            }]
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadIndex();
    displayProduct();
});
