$(function () {

	  function myTrim(x) {
	  var str = x.replace(/[+]+/g, '+');
    return str;
}
      function isPlus(a) {
	var inta=a.charAt(0);
	if(inta == '+')
		return true;
	return false;
}

    $("body").on("click", ".remove", function () {
        $(this).closest("div").remove();
	
    });
	 $("body").on("click", ".replace", function () {
        $("#textBox").val("");
	
    });
	//USAGE
	
	  $("body").on("keypress",".concept--input-container",function (e) {
      var code = e.which;
      if (code == 13){
        
	    var res = '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="btnGet">Get Related Topics</button>';
		$('#getTopic').html(res);
		
		//$('.concept--input').first().addClass(x);
		//var self = $('.concept--input-container');
		var x= $(this).find('.concept--input').addClass('tt-input').val();
		//var idText = "#" +id;
		//var x = $('#tb1').val();
			var y = '<div class="concept">'+'<div class="concept--typed-concept-container active">'+'<i class="fa fa-pencil" aria-hidden="true"></i>&nbsp&nbsp'+'<span class="concept--typed-concept label" >'+x+'</span>'
					+'<i class="concept--close-icon icon icon-close">'+'</i>'
			+'</div>';
         
		$(y).insertBefore('div.concept:last');
		e.preventDefault();
		var self = $('.concept--input-container');
		var concept = self.closest('.concept');

		concept.find('.active').removeClass('active');
		//console.log(concept.find('.active').removeClass('active'));
		
		concept.find('.concept--new-concept-container').addClass('active');
		concept.find('.concept--new').focus();
		$('#tb1').val('');
		
  //$('.concept--input-container').hide();
  //$('.concept--new-concept-container').live;
  //return $('.concept--new-concept-container');


      }
    });
	

	  /**
   * Event handler for concept tabs
   */
  $('.concept--new-concept-container').click(function(e) {
    e.preventDefault();
	$('#tb1').val('');
    var self = $(this);
    var concept = self.closest('.concept');

    concept.find('.active').removeClass('active');
    concept.find('.concept--input-container').addClass('active');
    concept.find('.concept--input').focus();
	
  });
  
  $('body').on('click','#topic',function() {
     //$(this).remove();
	 url = 'http://localhost:5000/endJourney/' + $(this).text();
	 $.get(url, function(data) {
	    var myText = '<div class="tab-panels" role="tabpanel">'+'<h3 class="base--h3"><b>About Topic<b></h3>'+data ['results'] +'<br/>'+'<a href="'+data ['links']+'" style="color:#0645AD">'+data ['links']+'</a></div>';
	    $('#leftBottom').html(myText);
	 });
  });
   
 $('body').on('click', '.concept--close-icon' , function(){
 $('#tb1').val('');
    $(this).closest('.concept').remove();
});

 $('body').on('click', '.fa' , function(e){
    //$(this).closest('.concept').remove();
	var temp = '<div class="concept--input-container active">'+
							 '<span class="twitter-typeahead" style="position: relative; display: inline-block;"><input class="concept--input tt-input" type="text" id="tb1" autocomplete="off" spellcheck="false" dir="auto" style="position: relative; vertical-align: top;"><pre aria-hidden="true" style="position: absolute; visibility: hidden; white-space: pre; font-family: "Helvetica Neue", Helvetica, "Open Sans", Arial, "Lucida Grande", Roboto, sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre></span></div>';
	
	 e.preventDefault();
	
    var self = $(this);
    var concept = self.closest('.concept');

    
    concept.html(temp);
    concept.find('.concept--input').focus(); 
	

	
	
});

 $('body').on('click', '.material-icons' , function(){
 var content = $(this).closest('.concept--derived-concept').find("button:first").text();


  var temp ='<div class="concept"><div class="concept--typed-concept-container active"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp&nbsp;<span class="concept--typed-concept label">'+
  content+'</span><i class="concept--close-icon icon icon-close"></i></div></div>';
  
  $('.concept--input-concept-list').find('div.concept:first').before(temp)
  
 });
 
     $('body').on('click','#btnGet',function () {
	  $("#p2").attr('style','display');
        var values = "";
		var val = "";
		var x =0;
        $('.concept').each(function( ) { 
		if(!$(this).is(':last-child')){

	val += $( this ).text().trim()+"+";
	}
	var temp = val;
	temp = myTrim(val);
	if(isPlus(temp)){
	temp =temp.slice(1);
	}
    $("#containerGraphs").data("search_topics",temp);
	url = 'http://localhost:5000/search/' + temp;
});
 
 



        //alert(values);
		  // 1. get the search query
    query = val.slice(0, -1);;
    // 2. prepare the api url
    //url = 'http://localhost:5000/search/' + val;
    
    // 3. make a request
    $.get(url, function(data) {
      // once the response returns, get the two keys
      //var query = data['results']['query'];
	query =myTrim(query);
	if(isPlus(query))
{
	query = query.slice(1);
} 
      var hello = data['results']['hello'];
	  var res = "";
	  var pre = "";
	  if (data['results'] == "Sorry topic doesn't exist"){
	  $('#tb1').val('');
	   pre = '<p><h1><b>'+data['results']+'</b></h1></p>';
	   $('#leftResult').html(pre);
	   
	  }
	  else{
	  var pre = '<div class="tab-panels" role="tabpanel">'
				+'<h3 class="base--h3"><b>Related Topics<b></h3>'+'<div class="how-it-works--graph">'
	+'<div class="concept--your-input-list">'
	+'<div class="concept--your-input-list-item">'
	+'<div class="concept--your-input">'
	+'<span class="concept--typed-concept"><button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id ="topic">'+query+'</button></span></div></div></div>'+'<div class="concept--derived-concept-list">';

      $("#containerGraphs").data("json_data",data);
	  for (i = 0; i < data['results'].length; i++) {
		pre += '<div class="concept--derived-concept-list-item">'+'<div class="concept--derived-concept active" data-index="'+i+'">'
				+'<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id ="topic">'
  +data ['results'][i]['concept']['label']+
'</button>&nbsp&nbsp<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored"><i class="material-icons">add</i></button>'
		+'</div></div>';

		res += data ['results'][i]['concept']['label'];
		res += "\n"
	  }
      // 3. format the output
	  query = query.slice(0,-1);
      var p = '<p class="node">'+query+'</p>'+'<p>Topic: ' + query + '</p>';
	  var h = '<h2>Related Topics</h2>'+'<textarea readonly rows="4" cols="40">'+ res +'</textarea>';
	  
	  //$(pre).insertAfter('.concept--input-concept-list');
	  
      // 4. display the output
	  //$("#results").html(p);
	  pre += '</div></div></div>';
	  $("#p2").attr('style','display:none');
	  $('#leftResult').html(pre)
	  }
      $("#leftResult").trigger("myCustomEvent");
		
		});
    });
});

 





 

  
  
	
	
  
  
 