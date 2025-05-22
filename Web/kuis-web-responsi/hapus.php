<?php 
include "koneksi/db.php"; 

// Ensure 'id' is set and sanitize input
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = intval($_GET['id']); // Convert to integer for safety

    // Prepare the SQL statement to prevent SQL injection
    $query = "DELETE FROM mahasiswa WHERE id = ?";
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }

    header("Location: index.php");
    exit();
} else {
    echo "<div class='alert alert-danger'>Invalid ID</div>";
}
?>
