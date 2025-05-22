<?php include "koneksi/db.php"; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Mahasiswa</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="container mt-5">
    <h2 class="mb-4">Tambah Data Mahasiswa</h2>

    <form method="POST">
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" name="username" id="username" class="form-control" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" name="password" id="password" class="form-control" required>
        </div>
        <button type="submit" name="simpan" class="btn btn-success">Simpan</button>
        <a href="index.php" class="btn btn-secondary">Kembali</a>
    </form>

    <?php 
    if (isset($_POST['simpan'])) {
        $username = $_POST['username'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

        $query = "INSERT INTO mahasiswa (username, password) VALUES ('$username', '$password')";
        if (mysqli_query($conn, $query)) {
            echo "<div class='alert alert-success mt-3'>Data berhasil disimpan.</div>";
            echo "<script>
                    alert('Data Berhasil Ditambah');
                    window.location.href = 'index.php';
                  </script>";
        } else {
            echo "<div class='alert alert-danger mt-3'>Gagal menyimpan data.</div>";
        }
    }
    ?>
</body>
</html>
