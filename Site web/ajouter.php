<?php

//Include required PHPMailer files
	require 'phpmailer/includes/PHPMailer.php';
	require 'phpmailer/includes/SMTP.php';
	require 'phpmailer/includes/Exception.php';
//Define name spaces
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
//Create instance of PHPMailer
	$mail = new PHPMailer();
//Set mailer to use smtp
	$mail->isSMTP();
//Define smtp host
	$mail->Host = "smtp.gmail.com";
//Enable smtp authentication
	$mail->SMTPAuth = true;
//Set smtp encryption type (ssl/tls)
	$mail->SMTPSecure = "tls";
//Port to connect smtp
	$mail->Port = "587";
//Set gmail username
	$mail->Username = "rapid.poste.tn24@gmail.com";
//Set gmail password
	$mail->Password = "rapidposte.tn24/07/22";
//Email subject
	$mail->Subject = "vous avez un nouveau colis";
//Set sender email
	$mail->setFrom('rapid.poste.tn24@gmail.com');
//Enable HTML
	$mail->isHTML(true);


session_start();
if(!empty($_POST['user']) && !empty($_POST['pass']))
{
	$_SESSION['user'] = $_POST['user'];
	$_SESSION['pass'] = $_POST['pass'];
}

if( !empty($_SESSION['user'])  && !empty($_SESSION['pass']) )
{
	if(($_SESSION['user'] == "root") &&  ($_SESSION['pass'] == "toor"))
	{
//connection to the database 
$conn = mysqli_connect("localhost","root","");
if(!$conn){ echo "conneciton failed"; }
mysqli_query($conn,"CREATE DATABASE IF NOT EXISTS post_tn");
mysqli_select_db($conn,"post_tn");
$query = 
"
CREATE TABLE IF NOT EXISTS `envois` ( `id` INT NOT NULL AUTO_INCREMENT,
	`rfidTag` VARCHAR(10) NOT NULL , `poids` VARCHAR(10) NOT NULL , `contreRembou` VARCHAR(20) NULL DEFAULT NULL , 
	`nonDest` VARCHAR(250) NOT NULL , `rueDest` VARCHAR(250) NULL DEFAULT NULL ,
	`postDest` VARCHAR(10) NOT NULL , `villeDest` VARCHAR(50) NULL DEFAULT NULL , `gouvDest` VARCHAR(50) NOT NULL , 
	`paysDest` VARCHAR(50) NULL DEFAULT NULL , `servDest` VARCHAR(200) NULL DEFAULT NULL , 
	`persContDest` VARCHAR(100) NULL DEFAULT NULL ,`telDest` VARCHAR(50) NULL DEFAULT NULL , 
	`adrDest` VARCHAR(200) NULL DEFAULT NULL , `emailDest` VARCHAR(100) NULL DEFAULT NULL ,

	`nonExp` VARCHAR(200) NOT NULL , `depExp` VARCHAR(200) NULL DEFAULT NULL , `rueExp` VARCHAR(250) NULL DEFAULT NULL , 
	`villeExp` VARCHAR(50) NULL DEFAULT NULL , `postExp` VARCHAR(10) NOT NULL , `paysExp` VARCHAR(50) NULL DEFAULT NULL , 
	`telExp` VARCHAR(50) NULL DEFAULT NULL , `faxExp` VARCHAR(50) NULL DEFAULT NULL , 
	`emailSocExp` VARCHAR(100) NULL DEFAULT NULL , `persExp` VARCHAR(100) NOT NULL , 
	`telPersExp` VARCHAR(50) NULL DEFAULT NULL ,`faxPersExp` VARCHAR(50) NULL DEFAULT NULL,
	`emailPersExp` VARCHAR(100) NULL DEFAULT NULL , PRIMARY KEY (`rfidTag`) ,  UNIQUE (`id`) ) ENGINE = InnoDB;
";
mysqli_query($conn,$query);

//create traffic table if not exists
$query2 = "     CREATE TABLE IF NOT EXISTS `traffic` ( 
				`id` INT NOT NULL AUTO_INCREMENT ,
				`rftag` VARCHAR(8) NULL DEFAULT NULL,
	            `date` VARCHAR(50) NOT NULL ,
	            `pays` VARCHAR(50) NOT NULL ,
	            `lieu` VARCHAR(100) NOT NULL , 
	            `type_even` VARCHAR(100) NULL DEFAULT NULL , 
	            `autres_info` VARCHAR(100) NULL DEFAULT NULL , 
	             PRIMARY KEY (`id`),
	             CONSTRAINT `constraint1` FOREIGN KEY (`rftag`) REFERENCES `envois` (`rfidTag`) 
	             ON DELETE SET NULL ON UPDATE CASCADE  
	              ) ENGINE = InnoDB;
          ";
$query_exe2 = mysqli_query($conn,$query2);
if(!$query_exe2) echo mysqli_error($conn);

//get data 
if(!empty($_POST['submited']))
{

	$rfidTag = $_POST['rfidTag'] ;
	$poids = $_POST['poids'];
	$contreRembou = $_POST['contreRembou'];

	$nonDest = $_POST['nonDest'] ;
	$postDest = $_POST['postDest'];
	$gouvDest = $_POST['gouvDest'];
	$emailDest = $_POST['emailDest'];

	$nonExp = $_POST['nonExp'];
	$postExp = $_POST['postExp'];
	$persExp = $_POST['persExp'];
	$emailPersExp = $_POST['emailPersExp'];


	//metter les données dans la base de donnée 
	$query1 = " INSERT INTO envois (rfidTag , nonDest, poids ,contreRembou , postDest , gouvDest , emailDest ,
	                               nonExp , postExp , persExp , emailPersExp ) 
	            VALUES  ('$rfidTag' , '$nonDest','$poids', '$contreRembou' , '$postDest' , '$gouvDest' , '$emailDest',
	                     '$nonExp' , '$postExp' , '$persExp' , '$emailPersExp')
	          ";
	$query_exe1 = mysqli_query($conn,$query1);
	if(!$query_exe1) echo mysqli_error($conn);
	$mail->Body = "Votre colis d'id : $rfidTag";
		$mail->addAddress($emailDest);
	//Finally send email
		 $mail->send();
	//Closing smtp connection
		$mail->smtpClose();

		$d = date("Y-m-d");
		$t = date("H:i:s");
		$dt = $d."<br>".$t;
		$sql9 = "INSERT INTO traffic(rftag,date, pays, lieu, type_even ) VALUES ('".$rfidTag."','".$dt."', 'Tunisia' , 'Agence Rapid-Poste Bizerte' , 'Recevoir les envois du client')";
		mysqli_query($conn,$sql9);
}
mysqli_close($conn);
?>



<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title> controle panel </title>
		

		<style type="text/css">
			*
			{
				margin:0px;
				padding: 0px;
			}
			h4
			{
				padding: 30px;
			}
			.dest
			{
				width: 350px;
				float:left;
				margin-top:  30px;
				margin-left:150px;
				padding: 25px;
				background:#e3e3e3;
				border-right: 0px ridge #F00;
				border-radius: 25px ;

			}
			.exp
			{
				width: 350px;
				float: right;
				margin-top:  30px;
				margin-right:150px;
				padding: 25px;
				background:#e3e3e3;
				border: 0px ridge #F00;
				border-radius: 25px;
			}
			.colisInfo
			{
				width:350px;
				background: #e3e3e3;
				border: 0px ridge #F00;
				border-radius: 25px;
				margin-top: 30px;
				margin-right: 30px;
				padding: 25px;
			}
			.logout
			{
				margin-top: 20px;
				margin-right: 20px;
				display: block;
				float: right;
			}
			.liv
			{
				margin-top: 20px;
				margin-right: 20px;
				float: right;

			}
			.divx
			{
				display: inline-block;
			}
			.div78
			{
				margin-top: 20px;
				margin-right: 20px;
				display: inline;
			}
			
		</style>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

	</head>

	<body>

		<img src="logo_poste.png" width="75" height="81.3">	
		<div class="div78">	
		<div class="logout">
		<a href="/rapidposte.tn/login.php" class="btn btn-danger btn-lg btn-block">
        <span class="glyphicon glyphicon-log-out"></span> Déconnecter </a></div>

        <div class="liv">
		<a href="/rapidposte.tn/livree.php" class="btn btn-warning btn-lg btn-block">
        <span class="glyphicon glyphicon-log-out"></span> livrée </a></div>
    </div>

        <center>administrateur <?php echo $_SESSION['user']; ?></center>

		<center>
		<div class="divx">
		<form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="post">

		<div class="colisInfo">
					 RFID TAG * : <br> <input type="text" class="form-control" name="rfidTag" >
							Poids (Kg):	<input type="text" class="form-control" name="poids" >
							Numéro de compte (pour l'offre Contre Remboursement) : 
										<input type="text" class="form-control" name="contreRembou" >
		</div>	

		<div class="dest">

		<h4> Destinataire : </h4>
		Nom/Raison sociale * : <br><input type="text" class="form-control" name="nonDest" > <br>
		Rue et N°            : <br><input type="text" class="form-control" name="rueDest"><br>
		Code postal *        : <br><input type="text" class="form-control" name="postDest"><br>
		Ville                : <br><input type="text" class="form-control" name="villeDest"><br>
		Gouvernorat *        : <br><input type="text" class="form-control" name="gouvDest"><br>
		Pays                 : <br><input type="text" class="form-control" name="paysDest"><br>
		Service destination  : <br><input type="text" class="form-control" name="servDest"><br>
		Personne de contact  : <br><input type="text" class="form-control" name="persContDest"><br>
		Tel contact          : <br><input type="text" class="form-control" name="telDest"><br>
		adresse contact      : <br><input type="text" class="form-control" name="adrDest"><br>
		E-mail contact       : <br><input type="text" class="form-control" name="emailDest"><br>
			                        
		</div> 

		<div class="exp">
		<h4> Expéditeur : </h4>
		Nom/Raison sociale * : <br><input type="text" class="form-control" name="nonExp" > <br>
		Département          : <br><input type="text" class="form-control" name="depExp"><br>
		Rue et N°            : <br><input type="text" class="form-control" name="rueExp"><br>
		Ville                : <br><input type="text" class="form-control" name="villeExp"><br>
		Code postal *        : <br><input type="text" class="form-control" name="postExp"><br>
		Pays                 : <br><input type="text" class="form-control" name="paysExp"><br>
		Tel                  : <br><input type="text" class="form-control" name="telExp"><br>
		Fax                  : <br><input type="text" class="form-control" name="faxExp"><br>
		Personne de contact *: <br><input type="text" class="form-control" name="persExp"><br>
		Tel contact          : <br><input type="text" class="form-control" name="telPersExp"><br>
		Fax contact          : <br><input type="text" class="form-control" name="faxPersExp"><br>
		E-mail contact       : <br><input type="text" class="form-control" name="emailPersExp"><br>
							   <br><input type="submit" class="btn btn-success btn-lg btn-block" name="submited" value="Ajouter" ><br>
		</div>
		</form><div><hr>





		</center>
	</body>
</html>
<?php 	
	}
	else
	{
		header('REFRESH:10;URL=login.php');
		echo "
		<head>
		<style>
		.connPage
		{

			margin-right: 500px;
			margin-left:500px;
		}
		h2
		{
			margin-top:100px;
		}
		</style>
				<link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css\" integrity=\"sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh\" crossorigin=\"anonymous\">
	</head>
		<center><img src=\"exclamark.png\" width=\" 200\" height=\" 200\"><br> <br> <br> <h2> LOGIN INCORRECT <h2> <br> 
		<div class=\"connPage\"><a href=\"/rapidposte.tn/login.php\" class=\"btn btn-success btn-lg btn-block\">
        <span class=\"glyphicon glyphicon-log-out\"></span> page de connexion </a></div> </center>";
	}
}
else
{
	header('REFRESH:0.01;URL=login.php');
}
?>