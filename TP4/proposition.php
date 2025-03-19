<?php

//TODO : Fixer la génération aléatoire de mots (que des mots de 6 lettres sont générés)

@require_once("dico.php");

if(!isset($_GET["min_char"]) || !isset($_GET["max_char"])){
    $size = rand(min(array_keys($dico)), max(array_keys($dico)));
    echo $dico[$size][rand(0, count($dico[$size])-1)];
}else{
    $size = rand($_GET["min_char"], $_GET["min_char"]);
    echo $dico[$size][rand(0, count($dico[$size])-1)];
}

?>