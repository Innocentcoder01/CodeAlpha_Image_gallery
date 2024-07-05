// Wait for the DOM to load completely before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all gallery item 
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');
    const autoZoomBtn = document.getElementById('auto-zoom');

    // Variables to manage auto-zoom functionality
    let autoZoomIndex = 0;
    let autoZoomInterval;

    // Add click event listeners to each gallery item to open them in the modal
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Display the modal and set the modal image source to the clicked image
            modal.style.display = 'block';
            modalImg.src = item.src;
        });
    });

    // Add click event listener to the close button to hide the modal and stop auto-zoom
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        clearInterval(autoZoomInterval);
    });

    // Add click event listener to window to close the modal if user clicks outside of the image
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            clearInterval(autoZoomInterval);
        }
    });

    // Add click event listener to the auto-zoom button
    autoZoomBtn.addEventListener('click', () => {
        autoZoomIndex = 0;
        modal.style.display = 'block';
        autoZoomImages();
        autoZoomInterval = setInterval(autoZoomImages, 3000);
    });

    // Function to handle auto-zooming images
    function autoZoomImages() {
        if (autoZoomIndex < galleryItems.length) {

            modalImg.src = galleryItems[autoZoomIndex].src;
            // Apply zoom and brightness effects
            modalImg.style.transform = 'scale(1.2)';
            modalImg.style.filter = 'brightness(1.2)';
            // After 2 seconds, reset the effects and move to the next image
            setTimeout(() => {
                modalImg.style.transform = 'scale(1)';
                modalImg.style.filter = 'brightness(1)';
                autoZoomIndex++;
                // If the last image has been displayed, stop auto-zoom
                if (autoZoomIndex >= galleryItems.length) {
                    clearInterval(autoZoomInterval);
                }
            }, 2000);
        }
    }
});
