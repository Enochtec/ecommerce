import { useState } from "react";

function NotFound() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [rides, setRides] = useState([]);
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleBookRide = () => {
        if (pickup.trim() === "" || destination.trim() === "") {
            alert("Please enter pickup and destination.");
            return;
        }

        const newRide = { pickup, destination, status: "Pending" };
        setRides([...rides, newRide]);
        setPickup("");
        setDestination("");
    };

    return (
        <div>
            <h1>Uber-Like App</h1>

            {isLoggedIn ? (
                <div>
                    <p>Welcome! You are logged in.</p>
                    
                    {/* Ride Booking Form */}
                    <div>
                        <input
                            type="text"
                            placeholder="Enter pickup location"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                        <button onClick={handleBookRide}>Book Ride</button>
                    </div>

                    {/* Rides List */}
                    <h2>Booked Rides</h2>
                    <ul>
                        {rides.map((ride, index) => (
                            <li key={index}>
                                {ride.pickup} → {ride.destination} ({ride.status})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <p>You must log in to book a ride.</p>
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default NotFound;
