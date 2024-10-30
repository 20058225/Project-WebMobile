import { data } from './data.js';

function displayProduct() {
    const passedId = new URLSearchParams(window.location.search).get('id');
    data.forEach((item) => {
        if (item.id == passedId) {
            document.querySelector('.photosHouse').innerHTML = 
                `<div><img class="modal-content" src="${item.kitchenPhoto}" alt="Photo kitchen"> </div>
                <div><img class="modal-content" src="${item.bathPhoto}" alt="Photo bath"> </div>
                <div><img class="modal-content" src="${item.roomPhoto}" alt="Photo room">  </div>`;
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
                    <form method="post">
                        <button type="button" " onclick="sendEmail()">Send Mail</button>
                    </form>
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
document.addEventListener('DOMContentLoaded', () => {
    loadIndex();
    displayProduct();
});
window.sendEmail = function() { //# Send Email
    Email.send({ 
        Host: "smtp.gmail.com",
        Username: "sender@email_address.com",
        Password: "Enter your password",
        To: 'receiver@mydbs.ie',
        From: "sender@email_address.com",
        Subject: "Sending Email using JavaScript",
        Body: "Well, that was easy!"
    }).then(function (message) {
        alert("Mail sent successfully");
    });
};
async function searchTerm() { //# Show modal search
    // Clear previous results
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    // Get the search term
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    
    if (!searchInput) {
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

            // Display results
            if (filteredResults.length > 0) {
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
                resultsContainer.innerHTML = "<p>No results found! Please, try again.</p>";
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
function closeModal() { //# Close resultsModal
    const resultsModal = document.getElementById("resultsModal");
    if (resultsModal) resultsModal.style.display = "none";
}
document.addEventListener('DOMContentLoaded', function() {  //# force  global access
    window.searchTerm = searchTerm; 
    window.closeModal = closeModal; 
});