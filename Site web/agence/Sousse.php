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
	$mail->Subject = "Mise a jour de l'emplacement de votre colis";
//Set sender email
	$mail->setFrom('rapid.poste.tn24@gmail.com');
//Enable HTML
	$mail->isHTML(true);
//connection to the database 
$conn = @mysqli_connect("localhost","root","","post_tn") or exit("no database");
if(!$conn){ echo "conneciton failed"; }
//Get current date and time
$d = date("Y-m-d");
$t = date("H:i:s");

$dt = $d."<br>".$t;


	
	
if(!empty($_POST["UIDresult"]))
{
	
    $sql1 = "INSERT INTO traffic(rftag,date, pays, lieu, type_even ) VALUES ('".$_POST['UIDresult']."','".$dt."', 'Tunisia' , 'Agence Rapid-Poste Sousse' , 'Recevoir les envois du client')";


	
	/*
	$result =    mysqli_query($conn,"select * from $tb_name");
	while ($row = mysqli_fetch_array($result)) 
		{
			if($row['lieu'] == "Agence Rapid-Poste Bizerte")
			{
				
			}
		}
	*/


	 $res = mysqli_query($conn,$sql1);
	 if($res)
	 {
	 	echo "ok";

    //Email body
	$mail->Body = "Votre clis d'id : '".$_POST['UIDresult']."' est a l'agence Rapid-Poste Sousse"." le ".$d." a ".$t;
	//Add recipient
	$query = 'select emailDest from envois where rfidTag = "'.$_POST["UIDresult"].'"';
	$result  =   mysqli_query($conn,$query);
	$emailDest = mysqli_fetch_array($result);
	$mail->addAddress($emailDest['emailDest']);

	//Finally send email
		 $mail->send();
	//Closing smtp connection
		$mail->smtpClose();
    }
	else
	{
	   echo "error";
	}

		/*
	if ($conn->query($sql1) === TRUE) { echo "OK"; }
	else { echo "Error: " . $sql1 . "<br>" . $conn->error; }
	*/
}

?>