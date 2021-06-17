<?php

    include_once('tbs_class.php'); 
    include_once('plugins/tbs_plugin_opentbs.php'); 

    $TBS = new clsTinyButStrong; 
    $TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN); 
    //Parametros
    $doctor = $_POST["doctor"];
    $fecha = date("d") . " de " . date("m") . " de " . date("Y");
    $nom_pac = $_POST["nom_pac"];
    $edad = $_POST["edad"];
    $enfermedad = $_POST["enfermedad"];
    $receta = $_POST["receta"];

    //Cargando template
    $template = 'Receta.docx';
    $TBS->LoadTemplate($template, OPENTBS_ALREADY_UTF8);

    //Escribir Nuevos campos
    $TBS->MergeField('nom_doc', $doctor);
    $TBS->MergeField('fecha', $fecha);
    $TBS->MergeField('nom_paciente', $nom_pac);
    $TBS->MergeField('edad', $edad);
    $TBS->MergeField('enfermedad', $enfermedad);
    $TBS->MergeField('receta', $receta);

    $TBS->PlugIn(OPENTBS_DELETE_COMMENTS);

    $save_as = (isset($_POST['save_as']) && (trim($_POST['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_POST['save_as']) : '';
    $output_file_name = str_replace('.', '_'.date('Y-m-d').$save_as.'.', $template);
    if ($save_as==='') {
        $TBS->Show(OPENTBS_DOWNLOAD, $output_file_name); 
        exit();
    } else {
        $TBS->Show(OPENTBS_FILE, $output_file_name);
        exit("File [$output_file_name] has been created.");
    }
?>