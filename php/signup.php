<?php
session_start();

// Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    if (empty($username) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Username and password are required."]);
        exit;
    }

    // Hash the password for secure storage
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Use a JSON file to store user accounts (replace with a database in production)
    $file = "users.json";
    $users = [];

    // Load existing users if file exists
    if (file_exists($file)) {
        $users = json_decode(file_get_contents($file), true) ?? [];
    }

    // Check if username already exists
    if (isset($users[$username])) {
        echo json_encode(["status" => "error", "message" => "Username already exists."]);
        exit;
    }

    // Save the new user
    $users[$username] = [
        "password" => $hashedPassword,
        "scores" => []
    ];

    file_put_contents($file, json_encode($users));

    echo json_encode(["status" => "success", "message" => "Account created successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
