<?php include "koneksi/db.php"; ?> 
<!DOCTYPE html> 
<html lang="en"> 
<head> 
  <title>Data Mahasiswa</title> 
  <link 
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap
 .min.css" rel="stylesheet"> 
</head> 
<body class="container mt-5"> 
  <h2>Data Mahasiswa</h2> 
  <a href="tambah.php" class="btn btn-primary mb-3">+ Tambah 
Mahasiswa</a> 
  <table class="table table-bordered"> 
    <thead class="table-dark"> 
      <tr><th>No</th><th>Username</th><th>Password</th><th>Aksi</th></tr> 
    </thead> 
    <tbody> 
      <?php 
      $no = 1; 
      $result = mysqli_query($conn, "SELECT * FROM mahasiswa"); 
      while ($row = mysqli_fetch_assoc($result)) { 
        echo "<tr> 
                <td>$no</td> 
                <td>{$row['username']}</td> 
                <td>{$row['password']}</td> 
                <td> 
                  <a href='edit.php?id={$row['id']}' class='btn btn
warning btn-sm'>Edit</a> 
                  <a href='hapus.php?id={$row['id']}' class='btn btn
danger btn-sm' onclick='return confirm(\"Hapus data 
ini?\")'>Hapus</a> 
                </td> 
              </tr>"; 
        $no++; 
      } 
      ?> 
    </tbody> 
  </table> 
</body> 
</html> 