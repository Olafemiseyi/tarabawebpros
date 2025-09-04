document.addEventListener('DOMContentLoaded', function() {
    const countdownDate = new Date("Sep 30, 2025 00:00:00").getTime();

    const countdownFunction = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").innerHTML = days;
            document.getElementById("hours").innerHTML = hours;
            document.getElementById("minutes").innerHTML = minutes;
            document.getElementById("seconds").innerHTML = seconds;
        }

        if (distance < 0) {
            clearInterval(countdownFunction);
            if (document.getElementById("countdown-timer")) {
                document.getElementById("countdown-timer").innerHTML = "<h3>The program has started!</h3>";
            }
        }
    }, 1000);
});