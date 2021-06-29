<!DOCTYPE html >
<html>
<head>
	<meta charset="utf-8">
	<meta name="description" content="Bienvenu au site du la rapide post tunisie">
	<title>Rapide Post</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
	<style type="text/css"> h1,h4{ color:red; } 

	form
	{
		width: 400px;
	}

	</style>
	
</head>
<body>



<center>
	<img src="logo_poste.png" width="150" height="162.75">
<h3>Suivez vos envois Rapid-Poste</h3>



<form action="/rapidposte.tn/index.php" method="post">
	  Numéro de l'envoi  :  <br>
	  						<input type="text" name="tagNum" class="form-control" placeholder="numéro du suivi" maxlength="8">
	  						<br>
	                        <input type="submit"  name="sub" class="btn btn-success" value="Valider" >
</form>




<?php
$conn = @mysqli_connect("localhost","root","","post_tn") or exit("<h4> Error dans le system ! </h4>");


if(!empty($_POST['sub']) && $conn)

{
	$rftag = $_POST['tagNum'];

	$query = 'select * from traffic where rftag = "'.$rftag.'"';



	$result  =   mysqli_query($conn,$query);
	$result1 =   mysqli_query($conn,$query);

	if($result1)
	{

	

	if(!empty(mysqli_fetch_array($result1)))
	{
		echo " Numéro d'envoi : ".$_POST['tagNum']."</center>";
		echo " <table class='table table-striped' >  <thead> <tr> <th><center> date </center> </th> <th> Pays </th> <th> Lieu </th> <th> type d'evenment </th> <th> Autres Informations </th> </tr>  </thead>  <tbody>";
		while ($row = mysqli_fetch_array($result)) 
		{
		  	echo  "<tr> <td><center>".$row['date']."</center></td> <td>".$row['pays']."</td><td>".$row['lieu']."</td><td>".$row['type_even']."</td><td> ".$row['autres_info']." </td></tr>";
		}
		echo " </tbody></table>";
	}
		else
		echo "<center><h4>Veuillez vérifier l'identifiant saisi \" ". $_POST['tagNum'] ." \" !</h4> </center>";
	}
}
?>

</body>
</html>