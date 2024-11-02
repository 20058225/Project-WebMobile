import { data } from './data.js';

document.addEventListener("DOMContentLoaded", function() { // # HEADER and FOOTER
    const currentFile = window.location.pathname.split("/").pop();
    const headerHTML = `
            <section class="header">
                <nav> <div class="nav-container">
                    <ul class="nav-list">
                        <li><a href="index.html"><img src="image/logo.png" alt="Logo" class="logo" id="logo"></a></li>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="mortgage.html">Mortgage</a></li>
                        <li><a id="btnSell" href="#Sell">Sell</a></li>
                        <li><input type="text" id="searchInput" placeholder="Search..." required><input id="searchTerm" type="button" value="Search" onclick="searchTerm()"></li>
                    </ul>
                </div>
                <h2>${currentFile === "index.html" ? "Welcome to BM Real Estate!" : "BM Real Estate Announcements"}</h2>
                </nav>
            </section> `;
    const footerHTML = `
        <section class="footer">
            <div>
                <p>Since ${new Date().getFullYear()} helping you to find your <b>H</b>ome <b>S</b>weet <b>H</b>ome</p>
                <p>&copy; ${new Date().getFullYear()} My Website. All rights reserved.</p>
            </div>
            <div>
                <p>Brenda Lopes</p>
                <a href="mailto:20058225@mydbs.ie" target="_blank">20058225@mydbs.ie</a> 
            </div>
            <div>
                <p>Marcelly Pedra</p> 
                <a href="mailto:20040674@mydbs.ie" target="_blank">20040674@mydbs.ie</a>
            </div>
        </section>`;
        
    /*document.getElementById("showHeader").innerHTML = headerHTML;
    document.getElementById("showFooter").innerHTML = footerHTML;*/

    // Insert content
    const headerContainer = document.getElementById("showHeader");
    if (headerContainer) headerContainer.innerHTML = headerHTML;

    const footerContainer = document.getElementById("showFooter");
    if (footerContainer) footerContainer.innerHTML = footerHTML;
});
function displayProduct() {  // # Show description of houses 
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.photosHouse').innerHTML = 
                `<div><img class="modal-content-house" src="${item.kitchenPhoto}" alt="Photo kitchen"> </div>
                <div><img class="modal-content-house" src="${item.bathPhoto}" alt="Photo bath"> </div>
                <div><img class="modal-content-house" src="${item.roomPhoto}" alt="Photo room">  </div>`;
            $('.photosHouse').slick({
                slidesToShow: 1,
                slidesToScroll: 1
            });
            document.querySelector('.next').addEventListener('click', function() {
                $('.photosHouse').slick('slickNext'); });
            document.querySelector('.prev').addEventListener('click', function() {
                $('.photosHouse').slick('slickPrev'); });
            document.querySelector('.infoHouse').innerHTML = `
                <h4>${item.type === 'buy' ? 'For Sale' : 'For Rent'} : 
                <b>${item.title}</b> </h4>
                <p>${item.description}</p>
                <p>Price: ${item.price} ${item.type === 'buy' ? '*<i>check the best option for your mortgage</i>' : '*<i>check the best option for your payment</i>'}</p>
                <p>Bedrooms: ${item.bed} | Bathrooms: ${item.bath}</p>
                <p>Location: ${item.location} 
                    <u><i><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.location)}" target="_blank">Google Maps</a></i></u></p> `;
            document.querySelector('.bookView').innerHTML = `
                <div class="bookEmail"> 
                    <h5>Do you need further information?</h5>
                    <div class="contact-info">
                        <input type="text" placeholder="Full name *" required><br>
                        <input type="email" placeholder="E-mail" required>
                        <input type="tel" placeholder="Phone number">
                    </div>
                    <form method="post">
                        <button id="btnBook" type="button">Book a view</button>
                    </form></div>`;
        }
    });
}
function loadIndex() { // # Show houses on index page
    let buyHouse = '';
    let rentHouse = '';

    data.forEach((item) => {
        const announcement = `
            <div class="list">
                <a href="./house.html?id=${item.id}">
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
document.addEventListener('DOMContentLoaded', () => { // call the function loadIndex and displayProduct
    loadIndex();
    displayProduct();
});
async function searchTerm() { //# Show modal search
    // Clear previous results
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    // Get the search term
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    
    if (!searchInput) { //TODO: replace to force required input 
        alert("Please enter a search term.");
        return;
    }

    try {
        // Fetch data from the JSON file
        const response = await fetch('./script/data.json');
        const data = await response.json();

        // Filter data based on the search term
        const filteredResults = data.filter(item => 
            item.title?.toLowerCase().includes(searchInput) || 
            item.price?.toLowerCase().includes(searchInput) ||
            item.location?.toLowerCase().includes(searchInput)
        );

        // Wait for the new window to load before accessing its DOM
        const resultsModal = document.getElementById("resultsModal");
        resultsModal.style.display = 'block';
            if (filteredResults.length > 0) {             // Display results
                filteredResults.forEach(item => {
                    const resultDiv = document.createElement("div");
                    resultDiv.classList.add("result");
                    
                    resultDiv.innerHTML = `
                    <div class="modal-dialog-search" role="document">
                        <div class="modal-body-search">
                            <span class="close" onclick="closeModal()">&times;</span>
                            <h2>Search Results</h2>
                            <p><a href="house.html?id=${item.id}">ID:${item.id} ${item.title}</a></p>
                            <p>Price: ${item.price}</p>
                            <p>Location:${item.location}</p>
                    </div></div>`;
                    resultsContainer.appendChild(resultDiv);
                });
            } else {
                resultsContainer.innerHTML = `
                    <span class='close' onclick='closeModal()'>&times;</span>
                    <p>No results found! Please, try again.</p>`;
            }
    } catch (error) {
        console.error("Error fetching the JSON file:", error);
        resultsContainer.innerHTML = "<p>Error loading data.</p>";
    }
}
document.addEventListener('DOMContentLoaded', function() {  //# Modal Show photos
    const photos = document.querySelectorAll('.photosHouse img'); // Select all images in photosHouse
    const modal = document.getElementById('photoModal'); // Get the modal
    const modalImage = document.getElementById('modalImage'); // Get the modal image

    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            modalImage.src = this.src; // Set the modal image source to the clicked image
            modal.style.display = 'block'; // Show the modal
        });
    });
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });
});
$(document).ready(function() { // Show the SellModal and ContactModal when clicking on their button
    $("#btnSell").click(function(event) { // open modal sell
        event.preventDefault();
        $("#modalSell").css("display", "block");
    });
    $("#btnBook").click(function(event) { // open modal contact
        event.preventDefault();
        $("#contactModal").css("display", "block");
    });

    $(".close").click(function() { // close modal sell
        $(".modal-sell").css("display", "none");
    });
    $(".close").click(function() {
        $(".modal-contact").css("display", "none");
    });
    $("#sellForm").submit(function(event) { // Close sell modal and open contact modal
        event.preventDefault();
        $("#modalSell").css("display", "none"); // Close Sell modal
        $("#contactModal").css("display", "block"); // Show confirmation modal
    });
});
function closeModal() { // # Close resultsModal
    const resultsModal = document.getElementById("resultsModal");
    if (resultsModal) resultsModal.style.display = "none";
}
document.addEventListener('DOMContentLoaded', function() {  //# force  global access
    window.searchTerm = searchTerm; 
    window.closeModal = closeModal; 
});