<?php 
include "koneksi/db.php"; 

$id = $_GET['id']; 
$query = "SELECT * FROM mahasiswa WHERE id=$id";
$result = mysqli_query($conn, $query);
$data = mysqli_fetch_assoc($result);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Mahasiswa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h2 class="mb-4">Edit Data Mahasiswa</h2>

    <form method="POST">
        <div class="mb-3">
            <label for="username" class="form-label">Nama</label>
            <input type="text" name="username" id="username" class="form-control" value="<?= htmlspecialchars($data['username']) ?>" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">New Password</label>
            <input type="password" name="password" id="password" class="form-control" required>
        </div>
        <button type="submit" name="update" class="btn btn-warning">Update</button>
        <a href="index.php" class="btn btn-secondary">Kembali</a>
    </form>

    <?php 
    if (isset($_POST['update'])) {
        $username = $_POST['username'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash new password
        
        $updateQuery = "UPDATE mahasiswa SET username='$username', password='$password' WHERE id=$id";
        
        if (mysqli_query($conn, $updateQuery)) {
            echo "<div class='alert alert-success mt-3'>Data berhasil diupdate.</div>";
        } else {
            echo "<div class='alert alert-danger mt-3'>Gagal mengupdate data.</div>";
        }
    }
    ?>
</body>
</html>
