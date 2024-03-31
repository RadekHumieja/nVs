<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>nVs</title>
</head>
<body>
    <?php
$name = $_POST["name"]; // input name="name"
$from = $_POST["email"]; // input name="email"
$subject = "Wiadomość z formularza na stronie nVs.pl";
$to = "rad.hum@icloud.com"; // adres, na który ma zostać wysłany mail
$message = $_POST["msg"]; // textarea name="msg"

$txt = "Imię: " . $name . "\r\n" . "Email: " . $from . "\r\n" . "\r\n" . "Treść: " . $message;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";

$mail_status = mail($to, $subject, $txt, $headers);

if ($mail_status) {
    header("Location: /Desktop/nVc/nVc.www/contact.html?mail_status=sent"); // jeśli formularz jest na stronie głównej, zmień na index.html
    exit;
} else {
    header("Location: /Desktop/nVc/nVc.www/contact.html?mail_status=error"); // jeśli formularz jest na stronie głównej, zmień na index.html
    exit;
}

    ?>

</body>
</html>

