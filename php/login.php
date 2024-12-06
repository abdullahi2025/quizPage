<?php
session_start(); // Start session to store user data

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve posted data
    $username = $_POST['username'] ?? null;
    $score = intval($_POST['score'] ?? 0);

    if ($username) {
        // Store user details in the session
        if (!isset($_SESSION['quiz_game'])) {
            $_SESSION['quiz_game'] = [];
        }

        $_SESSION['quiz_game'][$username] = [
            'score' => $score,
        ];

        echo json_encode([
            "status" => "success",
            "message" => "User data saved!"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Username is required!"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method!"
    ]);
}
?>
