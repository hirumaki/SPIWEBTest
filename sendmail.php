<?php
// 本文
$score = $_GET["score"];
$name= $_GET["name"];
$type= $_GET["type"];
$message = $name."さんが".$type."テストを受験しました。成績は".$score."点でした。";

// 1 行が 70 文字を超える場合のため、wordwrap() を用いる
$message = wordwrap($message, 70, "\r\n");

// 送信する
echo $message;
mail('support@white-academy.jp', 'ホワイトアカデミーの生徒が簡易テストを受験しました。', $message);
?>
