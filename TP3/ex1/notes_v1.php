<?php

header('Content-Type: application/json');

$libelles = array(
    "Autodiscipline",
    "Elementalisme",
    "Naturalisme",
    "Divination",
    "Prètrise",
    "Altération",
    "Conscience",
    "Guerrier",
    "Artisant"
);

$students_names = array(
    "Lord totor", "Woshrog", "Shongü", "Adelakaï", "Ill'an Louk", "Ahchmaradim", "Grodalf le fruit", "Garcimore", "Houquilni", "Gandalf le gris", "Gandalf le blanc", "Gandalf le noir", "Gobeurfined", "Hairy Ploter", "Zsächam"
);

$data = array(
    "libelles" => $libelles
);

$number_of_students = rand(1, 15);
$students = array();
for ($i = 0; $i < $number_of_students; $i++) {
    $name_i = rand(0, count($students_names) - 1);
    $student = array(
        "name" => $students_names[$name_i],
        "grades" => array()
    );
    unset($students_names[$name_i]);
    $students_names = array_values($students_names);
    
    for ($j = 0; $j < count($libelles); $j++) {
        $note = rand(0, 20);
        array_push($student["grades"], $note);
    }
    array_push($students, $student);
}

$data["students"] = $students;

echo json_encode($data);
 
?>

