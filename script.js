
alert("Nolan's week! book your favrt")

let movie = document.getElementById("movie");
let tickets = document.getElementById("tickets");
let time = document.getElementById("time");
let email = document.getElementById("email");
let total = document.getElementById("total");
let form = document.getElementById("bookingForm");
let message = document.getElementById("message");

let bookings = [];

// Calculate ticket price
function calculatePrice() {
    total.textContent = Number(movie.value) * Number(tickets.value);
}

movie.onchange = calculatePrice;
tickets.oninput = calculatePrice;


// Select movie from card
let buttons = document.querySelectorAll(".select-btn");

buttons.forEach(function(button) {
    button.onclick = function() {
        movie.value = button.getAttribute("data-movie");
        calculatePrice();

        document.getElementById("bookingForm").scrollIntoView();
    };
});


// Book tickets
form.onsubmit = function(event) {
    event.preventDefault();

    let quantity = Number(tickets.value);

    if (movie.value == "" || time.value == "" ||
        email.value == "" || quantity < 1 || quantity > 10) {
        
        message.textContent = "Please fill all details correctly.";
        return;
    }

    let movieName = movie.options[movie.selectedIndex].text;

    let booking = {
        name: movieName,
        time: time.value,
        email: email.value,
        tickets: quantity,
        price: Number(total.textContent)
    };

    bookings.push(booking);

    message.textContent = "Tickets booked successfully!";

    form.reset();
    total.textContent = "0";

    showBookings();
};


// Display bookings
function showBookings() {
    let list = document.getElementById("bookingList");
    let search = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    document.getElementById("count").textContent = bookings.length;

    for (let i = 0; i < bookings.length; i++) {
        let b = bookings[i];

        if (b.name.toLowerCase().indexOf(search) == -1) {
            continue;
        }

        let card = document.createElement("div");

        card.innerHTML = "<h3>" + b.name + "</h3>" +
            "<p>Showtime: " + b.time + "</p>" +
            "<p>Email: " + b.email + "</p>" +
            "<p>Tickets: " + b.tickets + "</p>" +
            "<p>Total: ₹" + b.price + "</p>";

        let cancel = document.createElement("button");
        cancel.textContent = "Cancel Booking";

        cancel.onclick = function() {
            bookings.splice(i, 1);
            showBookings();
        };

        card.appendChild(cancel);
        list.appendChild(card);
    }

    if (list.innerHTML == "") {
        list.textContent = "No bookings found.";
    }
}


// Search bookings
document.getElementById("search").oninput = showBookings;


// Reset form
form.onreset = function() {
    total.textContent = "0";
    message.textContent = "";
};
