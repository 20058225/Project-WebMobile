import { data } from './data.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.photosHouse').innerHTML = 
                `<div class="carousel">
                    <img class="modal-content" src="${item.kitchenPhoto}" alt="Photo kitchen"> </div>
                <div class="carousel">
                    <img class="modal-content" src="${item.bathPhoto}" alt="Photo bath"> </div>
                <div class="carousel">
                    <img class="modal-content" src="${item.roomPhoto}" alt="Photo room">  </div>`;
            $('.photosHouse').slick({
                slidesToShow: 1,
                slidesToScroll: 1
            });
            document.querySelector('.next').addEventListener('click', function() {
                $('.photosHouse').slick('slickNext');
            });
            document.querySelector('.prev').addEventListener('click', function() {
                $('.photosHouse').slick('slickPrev');
            });
            document.querySelector('.infoHouse').innerHTML = `
                <h4>${item.type === 'buy' ? 'For Sale' : 'For Rent'} : 
                <b>${item.title}</b> </h4>
                <p>${item.description}</p>
                <p>Price: ${item.price} ${item.type === 'buy' ? '*<i>check the best option for your mortgage</i>' : '*<i>check the best option for your payment</i>'}</p>
                <p>Bedrooms: ${item.bed} | Bathrooms: ${item.bath}</p>
                <p>Location: ${item.location} 
                    <u><i><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}" target="_blank">Google Maps</a></i></u></p>
                <div class="sendEmail"> 
                    <h5>Do you have any questions or need further information?</h5>
                    <input type="text" placeholder="Full name *" required>
                    <div class="contact-info">
                        <input type="email" placeholder="E-mail" required>
                        <span>or</span>
                        <input type="tel" placeholder="Phone number">
                    </div>
                    <textarea rows="4" cols="51" placeholder="We're here to help! What can we do for you? * " required></textarea>
                    <button type="submit">Submit</button>
                </div>
                `;
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
            autoplay: true,
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
            autoplay: true,
            prevArrow: '.prev-rent',
            nextArrow: '.next-rent',
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1 
                    }
                }]
        });
        $('.photosHouse').slick({
            slidesToShow: 3, 
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 3000,
            prevArrow: '.prev',
            nextArrow: '.next',
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

//Modal
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photosHouse img'); // Select all images in photosHouse
    const modal = document.getElementById('photoModal'); // Get the modal
    const modalImage = document.getElementById('modalImage'); // Get the modal image

    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            modalImage.src = this.src; // Set the modal image source to the clicked image
            modal.style.display = 'block'; // Show the modal
        });
    });
    /*document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });*/
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    });
});