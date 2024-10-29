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

    // Close the modal when the close button is clicked
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });

    // Close the modal when clicking outside of the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    });
});