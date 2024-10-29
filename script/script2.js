import { data } from "./data.js";

$(document).ready(function() {
    const buyItems = data.filter(item => item.type === "buy");
    const buyAnnounceContainer = $('.announceBuy');
    buyItems.forEach(item => {
        buyAnnounceContainer.append(`
            <div class="announcement">
                <img src="${item.image}" alt="${item.title}">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
                <a href="desc.html?id=${item.id}">View Details</a>
            </div>
        `);
    });
    const rentItems = data.filter(item => item.type === "rent");
    const rentAnnounceContainer = $('.announceRent');
    rentItems.forEach(item => {
        rentAnnounceContainer.append(`
            <div class="announcement">
                <img src="${item.image}" alt="${item.title}">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
                <a href="desc.html?id=${item.id}">View Details</a>
            </div>
        `);
    });
    $('.announceBuy').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.announceRent').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    if (id) {
        const item = data.find(item => item.id === id);
        if (item) {
            $('.type').text(item.type.charAt(0).toUpperCase() + item.type.slice(1));
            $('.title').text(item.title);
            $('.image').attr('src', item.image);
            $('.moreInfo').text(item.moreInfo);
        }
    }
});
