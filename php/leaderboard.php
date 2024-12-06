<?php
session_start();

header('Content-Type: application/json');

$file = 'users.json';

if (!file_exists($file)) {
    echo json_encode(["status" => "error", "message" => "No users found."]);
    exit;
}

$users = json_decode(file_get_contents($file), true);

// Build leaderboard based on the highest scores
$leaderboard = [];
foreach ($users as $username => $data) {
    $highestScore = max($data["scores"] ?? [0]);
    $leaderboard[] = ["username" => $username, "score" => $highestScore];
}

// Sort leaderboard by score (descending)
usort($leaderboard, function ($a, $b) {
    return $b["score"] - $a["score"];
});

echo json_encode(["status" => "success", "leaderboard" => $leaderboard]);
?>
