<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone']; 
$message = $_POST['message'];

$email_message = "
Name: $name
Email: $email
Phone: $phone
Message: $message
";

$to = "name@youremail.com"; // Your email here
$subject = "New Message"; // Subject message here
$headers = "From: $email" . "\r\n" .
           "Reply-To: $email" . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $email_message, $headers)) {
    echo "<h1>Thank you for your message!</h1>";
    echo "<p>Your message has been sent successfully.</p>";
} else {
    echo "<h1>Oops!</h1>";
    echo "<p>There was a problem sending your message. Please try again later.</p>";
}
?>
