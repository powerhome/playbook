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
//= require simple_form_markdown_editor
//= require prism


var copySnippet = function(event, iframe_id) {
  var copyText = window.frames[iframe_id].contentDocument.getElementById('snippet-container').innerHTML;
  var dummy = document.createElement("textarea");

  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  document.getElementById("dummy_id").value=copyText;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);

  $(event.target).addClass('copied').text('Copied!');
  setTimeout(function(){
    $(event.target).removeClass('copied').text('Copy snippet');
  }, 1000);
}

var toggleSnippet = function(event, iframe_id) {
  var previewEl = $('#'+iframe_id).parent().find('.toggle-snippet-preview');
  var toggleLink = $('#'+iframe_id).parent().find('.uix-component-link.toggle');

  if(previewEl.hasClass('shown')) {
    previewEl.removeClass('shown').hide();
    toggleLink.text('View Snippet');
  } else {
    previewEl.addClass('shown').show();
    toggleLink.text('Hide Snippet');
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
});
