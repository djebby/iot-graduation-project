<?php 
session_start();
session_unset();
session_destroy();
?>

<!DOCTYPE html>
<meta charset="utf-8">
<title>LOGIN POST TN</title>
<html>
<head>
	<title>POST TN ADMIN LOGIN</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<style type="text/css">
	div{
		width: 500px;
	}
	</style>
</head>
<body>
<center>
  <img src="logo_poste.png" width="150" height="162.75">
	<br> <br> <br>
<form action="/rapidposte.tn/ajouter.php" method="post">
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">  Admin </label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputEmail3" name="user" placeholder="Administrateur">
    </div>
  </div>

  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Passe</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" name="pass" placeholder="mot de passe">
    </div>
  </div>
  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary btn-md" name="logsubmited">Connecté</button>
    </div>
  </div>
</form>
</center>

</body>
</html>
