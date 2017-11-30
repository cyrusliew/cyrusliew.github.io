<!-- 
	EMAIL PHP
 -->
<?php
	if($_POST){
		$email = $_POST["email"];
		$subject = $_POST["subject"];
		$msg = $_POST["message"];
		mail("cyrusliew02@gmail.com", $subject, $email, $msg);
	}
?>