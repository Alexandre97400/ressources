dynForm = {
    jsonSchema : {
	    title : "Formulaire d'une ressource",
	    icon : "map-marker",
	    type : "object",
	    onLoads : {
	    	//pour creer un subevnt depuis un event existant
	    	sub : function(){
	    		if(contextData.type && contextData.id )
	    		{
    				$('#ajaxFormModal #parentId').val(contextData.id);
	    			$("#ajaxFormModal #parentType").val( contextData.type ); 
	    		}
	    	}, 
	    	onload : function(data){
	    		if(data && data.section){
	    			$(".breadcrumbcustom").html( "<h4><a href='javascript:;'' class='btn btn-xs btn-danger'  onclick='dyFObj.elementObj.dynForm.jsonSchema.actions.clear()'><i class='fa fa-times'></i></a> "+data.section+"</h4>");
					$(".sectionBtntagList").hide();
	    		} else
	    			$(".typeBtntagList, .nametext, .descriptiontextarea, .pricetext, .contactInfotext, .locationlocation, .imageuploader, .formshowerscustom, .tagstags, #btn-submit-form").hide();

	    		if(contextData.type && contextData.id )
	    		{
    				$('#ajaxFormModal #parentId').val(contextData.id);
	    			$("#ajaxFormModal #parentType").val( contextData.type ); 
	    		}	
	    	},
	    },
	    beforeSave : function(){
	    	
	    	var tagAndTypes = ( $("#ajaxFormModal #tags").val() != "" ) ? $("#ajaxFormModal #tags").val()+"," : "" ;

	    	if( $("#ajaxFormModal #section").val() )
	    		tagAndTypes += $("#ajaxFormModal #section").val();
	    	if( $("#ajaxFormModal #type").val() )
	    		tagAndTypes += ","+$("#ajaxFormModal #type").val();
	    	if( $("#ajaxFormModal #subtype").val() )
	    		tagAndTypes += ","+$("#ajaxFormModal #subtype").val();
	    	$("#ajaxFormModal #tags").val( tagAndTypes );

	    	if( typeof $("#ajaxFormModal #description").code === 'function' )  
	    		$("#ajaxFormModal #description").val( $("#ajaxFormModal #description").code() );
	    	if($('#ajaxFormModal #parentId').val() == "" && $('#ajaxFormModal #parentType').val() ){
		    	$('#ajaxFormModal #parentId').val( userId );
		    	$("#ajaxFormModal #parentType").val( "citoyens" ); 
		    }
	    },
	    beforeBuild : function(){
	    	dyFObj.setMongoId('ressource', function(){
	    		uploadObj.gotoUrl = (contextData != null && contextData.type && contextData.id ) ? "#page.type."+contextData.type+".id."+contextData.id+".view.directory.dir.ressources" : location.hash;
	    	});
	    },
		afterSave : function(){
			if( $('.fine-uploader-manual-trigger').fineUploader('getUploads').length > 0 )
		    	$('.fine-uploader-manual-trigger').fineUploader('uploadStoredFiles');
		    else { 
	          dyFObj.closeForm(); 
	          urlCtrl.loadByHash( uploadObj.gotoUrl );
	        }
	    },
	    actions : {
	    	clear : function() {
	    		
	    		$("#ajaxFormModal #section, #ajaxFormModal #type, #ajaxFormModal #subtype").val("");

	    		$(".breadcrumbcustom").html( "");
	    		$(".sectionBtntagList").show(); 
	    		$(".typeBtntagList").hide(); 
	    		$(".subtypeSection").html("");
	    		$(".subtypeSectioncustom").show();
	    		$(".typeBtntagList, .nametext, .descriptiontextarea, .pricetext, .contactInfotext, .locationlocation, .imageuploader, .formshowerscustom, .tagstags").hide();
	    	}
	    },
	    properties : {
	    	info : {
                inputType : "custom",
                html:"<p><i class='fa fa-info-circle'></i> Un Point d'interet est un élément assez libre qui peut etre géolocalisé ou pas, qui peut etre rataché à une organisation, un projet ou un évènement.</p>",
            },
            breadcrumb : {
                inputType : "custom",
                html:"",
            },
            sectionBtn :{
                label : "De quel type de ressource s'agit-il ?",
	            inputType : "tagList",
                placeholder : "Choisir un type",
                list : modules.ressources.categories.sections,
                trad : trad,
                init : function(){
                	$(".sectionBtn").off().on("click",function()
	            	{
	            		$(".typeBtntagList").show();
	            		$(".sectionBtn").removeClass("active btn-dark-blue text-white");
	            		$( "."+$(this).data('key')+"Btn" ).toggleClass("active btn-dark-blue text-white");
	            		$("#ajaxFormModal #section").val( ( $(this).hasClass('active') ) ? $(this).data('key') : "" );
						//$(".sectionBtn:not(.active)").hide();
						var sectionKey = $(this).data('key');
						//alert(sectionKey);
						var what = { title : tradDynForm["inwhichcategoryforclassified"]+" ?", 
				                         icon : modules.ressources.categories.sections[sectionKey].icon }
						if( jsonHelper.notNull( "modules.ressources.categories.sections."+sectionKey+".filters" ) ){
				            //alert('build btns menu'+classified.sections[sectionKey].filters);
				            modules.ressources.categories.currentLeftFilters = modules.ressources.categories.sections[sectionKey].filters;
				            var filters = ressource[modules.ressources.categories.currentLeftFilters]; 
				            directory.sectionFilter( filters, ".typeBtntagList",what,'btn');
				            dyFObj.elementObj.dynForm.jsonSchema.actions.initTypeBtn();
				        }
				        else if( modules.ressources.categories.currentLeftFilters != null ) {
				            //alert('rebuild common list'); 
				            directory.sectionFilter( modules.ressources.categories.filters, ".typeBtntagList",what,'btn');
				            dyFObj.elementObj.dynForm.jsonSchema.actions.initTypeBtn()
				            modules.ressources.categories.currentLeftFilters = null;
				        }
						$(".breadcrumbcustom").html( "<h4><a href='javascript:;'' class='btn btn-xs btn-danger'  onclick='dyFObj.elementObj.dynForm.jsonSchema.actions.clear()'><i class='fa fa-times'></i></a> "+$(this).data('tag')+"</h4>");
						$(".sectionBtntagList").hide();
	            	});
	            }
            },
            section : dyFInputs.inputHidden(),
	        typeBtn :{
                label : "Type of ressource ? ",
	            inputType : "tagList",
                placeholder : "Choose a category",
                list : modules.ressources.categories.filters,
                init : function(){
	            	$(".typeBtn").off().on("click",function()
	            	{
	            		
	            		$(".typeBtn").removeClass("active btn-dark-blue text-white");
	            		$( "."+$(this).data('key')+"Btn" ).toggleClass("active btn-dark-blue text-white");
	            		$("#ajaxFormModal #type").val( ( $(this).hasClass('active') ) ? $(this).data('tag') : "" );
	            		
	            		$(".breadcrumbcustom").html( "<h4><a href='javascript:;'' class='btn btn-xs btn-danger'  onclick='dyFObj.elementObj.dynForm.jsonSchema.actions.clear()'><i class='fa fa-times'></i></a>  "+$(".sectionBtn.active").data('tag')+" > "+$(".typeBtn.active").data('tag')+"</h4>" );
	            		$(".typeBtntagList").hide();

	            		//$(".typeBtn:not(.active)").hide();
	            		$("#ajaxFormModal #subtype").val("");
	            		fieldHTML = "";
	            		$.each(modules.ressources.categories.filters[ $(this).data('key') ]["subcat"], function(k,v) { 
	            			fieldHTML += '<div class="col-md-6 padding-5">'+
        									'<a class="btn tagListEl subtypeBtn '+k+'Btn " data-tag="'+v.label+'" href="javascript:;">'+v.label+'</a>' +
	            						"</div>";
	            		});
	            		$(".subtypeSection").html('<hr class="col-md-12 no-padding">'+
	            								  '<label class="col-md-12 text-left control-label no-padding" for="typeBtn">'+
	            								  	'<i class="fa fa-chevron-down"></i> Sous-catégorie'+
	            								  '</label>' +
	            								  fieldHTML );

	            		$(".subtypeBtn").off().on("click",function()
		            	{
		            		$( ".subtypeBtn" ).removeClass("active");
		            		$(this).addClass("active");
		            		$("#ajaxFormModal #subtype").val( ( $(this).hasClass('active') ) ? $(this).data('tag') : "" );
		            		$(".nametext, .descriptiontextarea, .pricetext, .contactInfotext, .locationlocation, .imageuploader, .formshowerscustom, .tagstags").show();
		            		//$(".subtypeBtn:not(.active)").hide();

		            		$(".breadcrumbcustom").html( "<h4><a href='javascript:;'' class='btn btn-xs btn-danger'  onclick='dyFObj.elementObj.dynForm.jsonSchema.actions.clear()'><i class='fa fa-times'></i></a> "+$(".sectionBtn.active").data('tag')+" > "+$(".typeBtn.active").data('tag')+" > "+$(".subtypeBtn.active").data('tag')+"</h4>" );
		            		$(".subtypeSectioncustom").hide();
						});
	            	});
	            }
            },
            type : dyFInputs.inputHidden(),
            subtypeSection : {
                inputType : "custom",
                html:"<div class='subtypeSection'></div>"
            },
            subtype : dyFInputs.inputHidden(),
            name : dyFInputs.name("ressource"),
	        image : dyFInputs.image(),
            description : dyFInputs.textarea("Description", "..."),
            location : dyFInputs.location,
            tags :dyFInputs.tags(),
            formshowers : {
            	label : "En détails",
                inputType : "custom",
                html: "<a class='btn btn-default text-dark w100p' href='javascript:;' onclick='$(\".urlsarray\").slideToggle()'><i class='fa fa-plus'></i> options (urls)</a>",
            },
            urls : dyFInputs.urlsOptionnel,
            parentId : dyFInputs.inputHidden(),
            parentType : dyFInputs.inputHidden(),
	    }
	}
};