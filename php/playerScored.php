<?php
session_start();

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? null;
    $score = intval($_POST['score'] ?? 0);

    if (!$username || $score <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid username or score."]);
        exit;
    }

    $file = "users.json";
    if (!file_exists($file)) {
        echo json_encode(["status" => "error", "message" => "No users found."]);
        exit;
    }

    $users = json_decode(file_get_contents($file), true);

    if (!isset($users[$username])) {
        echo json_encode(["status" => "error", "message" => "User not found."]);
        exit;
    }

    // Update the scores
    $users[$username]["scores"][] = $score;

    file_put_contents($file, json_encode($users));

    echo json_encode(["status" => "success", "message" => "Score updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
