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
	$mail->Subject = "colis expidée";
//Set sender email
	$mail->setFrom('rapid.poste.tn24@gmail.com');
//Enable HTML
	$mail->isHTML(true);



session_start();


if( !empty($_SESSION['user'])  && !empty($_SESSION['pass']) )
{
if(($_SESSION['user'] == "root") &&  ($_SESSION['pass'] == "toor"))
{


if(!empty($_POST['submited']))
{


	$conn = mysqli_connect("localhost","root","");
	if(!$conn){ echo "conneciton failed"; }
	mysqli_select_db($conn,"post_tn");

	$rfidTag = $_POST['rfidTag'] ;


	$mail->Body = "Votre colis d'id : $rfidTag est expidée ";
	$query2 = 'select emailPersExp from envois where rfidTag = "'.$rfidTag.'"';
	$result  =   mysqli_query($conn,$query2);
	$emailPersExp = mysqli_fetch_array($result);
	$mail->addAddress($emailPersExp['emailPersExp']);
	$mail->send();
	$mail->smtpClose();




	$query1 = 'select id from envois where rfidTag = "'.$rfidTag.'"';
	$result  =   mysqli_query($conn,$query1);
	$id = mysqli_fetch_array($result);
	$id1 = $id['id'];



	$query = "	UPDATE envois SET rfidTag='id= $id1 ' WHERE rfidTag = '$rfidTag'";
	mysqli_query($conn,$query);



}






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
		<a href="/rapidposte.tn/ajouter.php" class="btn btn-success btn-lg btn-block">
        <span class="glyphicon glyphicon-log-out"></span> Ajouter </a></div>
    </div>

        <center>administrateur <?php echo $_SESSION['user']; ?></center>

		<center>
		<form action="<?php echo $_SERVER["PHP_SELF"] ?>" method="post">
		<div class="colisInfo">
					 RFID TAG * : <br> <input type="text" class="form-control" name="rfidTag" >
							   <br><input type="submit" class="btn btn-warning btn-lg btn-block" name="submited" value="livrée"><br>
		</form>

		</center>
	</body>
</html>

<?php 
}else echo "incorrect login"; 

} 
else
{
	header('REFRESH:0.01;URL=login.php');
} ?>