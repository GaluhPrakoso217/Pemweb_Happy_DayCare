document.addEventListener("DOMContentLoaded", function() {
    var slideIndex = 0;
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("carousel-item");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 5000); // Ubah gambar setiap 2 detik
    }

    // Tombol kontrol slide sebelumnya dan selanjutnya
    var prevButton = document.querySelector(".carousel-control-prev");
    var nextButton = document.querySelector(".carousel-control-next");
    prevButton.addEventListener("click", function() {
        slideIndex -= 1;
        showSlides();
    });
    nextButton.addEventListener("click", function() {
        slideIndex += 1;
        showSlides();
    });
});