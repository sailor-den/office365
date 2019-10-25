<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/PHPMailer/src/Exception.php';
require_once __DIR__ . '/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/src/SMTP.php';

// Grab variables
$company = $_POST['company'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];
$obeForm = $_POST['obeForm'];
$priceObesForm = $_POST['priceObesForm'];
$obForm = $_POST['obForm'];
$priceObsForm = $_POST['priceObsForm'];
$obpForm = $_POST['obpForm'];
$priceObpsForm = $_POST['priceObpsForm'];
$licenseCountForm = $_POST['licenseCountForm'];
$totalPriceLicenseForm = $_POST['totalPriceLicenseForm'];

$orderNumber = round(microtime(true) * 1000);




// Create new PDF instance
$mpdf = new \Mpdf\Mpdf();


// Create our PDF
$data = '';

$data .= '<h1>Your Details</h1>';

// Add data
$data .= '<strong>Компания:</strong> ' . $company . '<br />';
$data .= '<strong>Имя:</strong> ' . $name . '<br />';
$data .= '<strong>Телефон:</strong> ' . $phone . '<br />';
$data .= '<strong>Email:</strong> ' . $email . '<br />';
$data .= '<br /><strong>Office 365 бизнес базовый:</strong> ' . $obeForm . '<br />';
$data .= '<strong>Стоимость в месяц:</strong> ' . $priceObesForm . ' <strong>p/мес.</strong>' . '<br />';
$data .= '<br/><strong>Office 365 бизнес:</strong> ' . $obForm . '<br />';
$data .= '<strong>Стоимость в месяц:</strong> ' . $priceObsForm . ' <strong>p/мес.</strong>' . '<br />';
$data .= '<br /><strong>Office 365 бизнес премиум:</strong> ' . $obpForm . '<br />';
$data .= '<strong>Стоимость в месяц:</strong> ' . $priceObpsForm . ' <strong>p/мес.</strong>' . '<br />';
$data .= '<br /><strong>Колличество лицензий итог:</strong> ' . $licenseCountForm . '<br />';
$data .= '<br /><strong>Стоимость в месяц итог:</strong> ' . $totalPriceLicenseForm . ' <strong>p/мес.</strong>' . '<br />';


if($message) 
{
    $data .= '<br /><strong>Сообщение:</strong><br />' . $message;
}


// Write PDF
$mpdf->WriteHTML($data);


// Output to string     
$pdf = $mpdf->Output('', 'S');


// Grab enquiry data
$enquirydata = [

    'Компания' => $company,
    'Имя' => $name,
    'Телефон' => $phone,
    'Email' => $email,
    'Сообщение' => $message,
    'Заявка № ' => $orderNumber
    
];


// Run the function
sendEmail($pdf, $enquirydata);








function sendEmail($pdf, $enquirydata)
{
    // $Uid = uniqid();
    

    $emailbody = '<h1 style="font-size:18px;">Спасибо за обращение в компанию Альтерис.<h1>';
    $emailbody .= '<h1 style="font-size:18px;">Ваша заявка № ' . $GLOBALS['orderNumber'] .'<h1>';
    $emailbody .= '<h1 style="font-size:18px;">Ваш расчет в приложении к письму.<h1>';



    $emailbody2 = '';
    $emailbody2 .= '<h1 style="font-size:20px;">Заявка от ' . $enquirydata['Компания'] . '<h1>';

    foreach ($enquirydata as $title => $data)
    {

        // $emailbody .=  '<div style="font-size:20px;">' . '<strong> '. $title . '</strong>: ' . $data . '</div>' . '<br />';
        $emailbody2 .=  '<strong style="font-size:18px;">'. $title . ': </strong>' . '<strong style="font-size:20px;">'. $data . '</strong>' . '<br />';

    }

    

    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";

try {

    $to = $_POST['email'];
    //Server settings
    $mail->SMTPDebug = false;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.yandex.ru';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'den.obraz@yandex.ru';                     // SMTP username
    $mail->Password   = 'P@$$word25';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 465;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('den.obraz@yandex.ru', 'Альтерис');
    // $mail->addAddress('DPreobrazhensky@alteris.ru', 'Joe User');     // Add a recipient
    $mail->addAddress($to);               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name


    //Attachment
    $mail->addStringAttachment($pdf, 'myAttachment.pdf');

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Заявка на покупку лицензий Office365';
    $mail->Body    = $emailbody;
    $mail->AltBody = strip_tags($emailbody);

    $mail->send();

    $mail->ClearAddresses();

    $mail->AddAddress('DPreobrazhensky@alteris.ru');
    // $mail->addCC('info@alteris.ru');
    $mail->Subject = 'Заявка от ' . $enquirydata['Компания'] . ' на покупку лицензий Office365';
    $mail->Body = $emailbody2;
    $mail->Send();
     
    // header('Location:thanks.php?name=' . $enquirydata['Name']); // Send thank you page

} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

}