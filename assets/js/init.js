/* ******************
CO.js
********************* */
//var/www/dev/modules/co2/config/CO2/params.json:
urlCtrl.loadableUrls[ "#ressource" ] = {
	inMenu : true, 
    useHeader : true, 
    open : true, 
    subdomain : "ressource", 
    subdomainName : "Ressources",
    hash : "#ressources.co.share",
    icon : "cubes", 
    mainTitle : "Moteur de Ressource <span class='text-red'>territoriales</span>",
    placeholderMainSearch : "Rechercher un ressource ...",
    lblBtnCreate : "Ajouter une ressource",
    colorBtnCreate : "purple",
    module:"ressources"
};

// MODULES
urlCtrl.loadableUrls["#ressources.co"] = {title:'RESSOURCES', icon : 'puzzle-piece',useHeader : true, module:"ressources"};
urlCtrl.loadableUrls["#rsc"] = {"alias":"#ressources"};

//co.js object types
typeObj.ressource = {  col:"ressources",ctrl:"ressource",color:"azure",icon:"cube", titleClass : "bg-azure", bgClass : "bgPerson"};
typeObj.ressources = { sameAs:"ressource" };

//CO LANG
co.rsc = {
    form : function() { dyFObj.openForm("ressource") },
    i : function () { co.ctrl.lbh("#"+userConnected.username+".view.directory.dir.ressources");},
};
