// on notebook hover, show delete button
$(document).on('mouseenter','.notebook',function() {
    $(this).find('.delete-notebook' ).css('display', 'block');
});

$(document).on('mouseleave','.notebook',function() {
    $(this).find('.delete-notebook' ).css('display', 'none');
});

// when delete-notebook is pressed
$(document).on('click','.delete-notebook',function(){
  // $('#test').html('hola '+$(this).parent().find('.index').val());
  // deleting the notebook from the array
  noteArr.splice($(this).parent().find('.index').val(), 1);
  // save in local storage
  localStorage.setItem('noteBox', JSON.stringify(noteArr));
  //location.reload();
  location.href = location.href;
});

// on click notebook title, open notebook
$('.notebook-title').on('click', function(){
  $('#inside-notebook-section').css("display","block");
});

// back to notebooks button
$('#back-to-notebooks').on('click', function(){
  $('#inside-notebook-section').css("display","none");
});

// show-hide new category inputs
$('.new-notebook-button').on('click', function(){
  // hide + button
  $('#show-new-notebook').toggleClass("hide");
  // show description
  $('.add-notebook').toggleClass("show");
});

// add new notebook
$('#submit-notebook').on('click',function(){

  // append new notebooks inside wrapper
  $("#notebook-wrapper").append('<div class="notebook '+$('#notebook-color').val()+'-notebook"><h1>'+$('#notebook-title').val()+'</h1><button class="delete-notebook">Delete Notebook</button><div class="notebook-band"></div></div>');

  // adding notebook to array
noteArr.push(new noteObj($('#notebook-title').val(), $('#notebook-color').val()));

  //$('#test').html('hola '+noteArr[0].noteName);

  // save notebook in local storage
  localStorage.setItem('noteBox', JSON.stringify(noteArr));

});

// when the windows load
window.onload = function(){

  if (typeof(Storage) !== "undefined") {
    // local storage is available

    $('#test').html(noteArr[0].noteName);
    //$('#test').html('hola '+noteArr[0].noteName);

    // loop to add already saved notebooks
    // CREATE A FUNCTION FOR APPENDING EACH ELEMENT
   for(var i=0; i<JSON.parse(localStorage.noteBox).length; i++){
     $("#notebook-wrapper").append('<div class="notebook '+noteArr[i].noteColor+'-notebook"><input class="index" type="hidden" value="'+i+'" /><h1>'+noteArr[i].noteTitle+'</h1><button class="delete-notebook">Delete Notebook</button><div class="notebook-band"></div></div>');
   }

  } else {
    // no web storage support

  }
};

// array of notebooks objects
var noteArr = [];
// notebooks objects constructor
function noteObj(name, color){
  this.notetitle=name;
  this.noteColor=color;
  // array of categories objects
  this.noteCategories=[];
  // array of cards objects
  this.noteCards=[];
}
// load saved notebooks
noteArr = JSON.parse(localStorage.noteBox);
