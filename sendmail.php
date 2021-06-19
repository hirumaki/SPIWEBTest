<?php
// 本文
$score = $_GET["score"];
$name= $_GET["name"];
$message = "こんにちは".$name."さん。\r\nあなたの成績は".$score."点です。";

// 1 行が 70 文字を超える場合のため、wordwrap() を用いる
$message = wordwrap($message, 70, "\r\n");

// 送信する
echo $message;
mail('index3583@gmail.com', 'My Subject', $message);
?>