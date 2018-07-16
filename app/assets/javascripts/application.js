// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require turbolinks
//= require regular.js
//= require fontawesome.js
//= require simple_form_markdown_editor
//= require prism


var copySnippet = function(event, iframe_id, preview) {
  preview = preview || false;
  var copyText = window.frames[iframe_id].contentDocument.getElementById('snippet-container').innerHTML;
  var dummy = document.createElement("textarea");

  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  document.getElementById("dummy_id").value=copyText;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  if(preview == false){
    $(event.target).closest('#copy-text').text('Copied!');
    $(event.target).closest('#copy-icon').addClass('hidden');
    $(event.target).closest('#copied-icon').addClass('text-power-green').removeClass('hidden');
    setTimeout(function(){
      $(event.target).closest('#copy-text').text('Copy snippet');
      $(event.target).closest('#copy-icon').removeClass('hidden');
      $(event.target).closest('#copied-icon').removeClass('text-power-green').addClass('hidden');
    }, 1000);
  } else {
    $('#copy-icon').addClass('hidden');
    $('#copied-icon').addClass('text-power-green').removeClass('hidden');
    setTimeout(function(){
      $('#copy-icon').removeClass('hidden');
      $('#copied-icon').removeClass('text-power-green').addClass('hidden');
    }, 1000);
  }
}

var snippetFrameLoad = function(id){
 $("#copy-"+id).removeClass('hidden');
}

var toggleSnippet = function(event, iframe_id, preview) {
  preview = preview || false;
  var previewEl = $('#'+iframe_id).parent().find('.toggle-snippet-preview');
  var toggleLink = $('#'+iframe_id).parent().find('.uix-component-link.toggle');

  if(preview == false){
    if(previewEl.hasClass('shown')) {
      previewEl.removeClass('shown');
      toggleLink.html('<i class="far fa-eye mr-1"></i> View code');
    } else {
      previewEl.addClass('shown');
      toggleLink.html('<i class="far fa-eye-slash mr-1"></i> Hide code');
    }
  }
}

$( document ).ready(function() {
  $(".notify .nitro-notify").hide();
	$(".notify .nitro-notify").fadeIn("slow",function(){
    setTimeout(function(){
      $(".notify .nitro-notify").fadeOut("slow", function() {
        $(this).parent().remove();
      });
    }, 4000);
	});
  $('[data-toggle="tooltip"]').tooltip();
});

$( document ).on("turbolinks:load", function() {
  FontAwesome.dom.i2svg();
});
