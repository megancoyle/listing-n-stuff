
'use strict';
var MyApp = {};
var $thingList = $('#fav-list');
var $favThing = $('.fav-thing');


//Ability to edit the input field
$thingList.on('click','.fav-thing span',function() {
    var fieldText = $(this).text();
    var input = $('<input value="'+fieldText+'"/>');
    $(this).text('').append(input);
    input.focus();
});

$thingList.on('blur','input',function() {
    $(this).parent().text($(this).val());
});

MyApp.addToList = function(list) {
  var $newList = $('<li class="fav-thing"><span>');
  var $newItemText = $('#new-thing');
  $newList.find('span').html($newItemText.val());
  $newItemText.val('');
  if ($newList.html() !== '') {
    list.append($newList);
  }
  MyApp.addButtons($newList);
}

MyApp.initiateButtons = function($thingList) {
  $thingList.find('li').each(function() {
    MyApp.addButtons($(this));
  });
}

MyApp.addButtons = function($item) {
  var completeBtn = ' <a href="#" class="complete">Complete</a>';
  $item.append(completeBtn);

  var deleteBtn = ' <a href="#" class="delete">Delete</a>';
  $item.append(deleteBtn);
}

$(function() {
  var $button = $('#new-thing-button');

  $button.on('click', function(e) {
    e.preventDefault();
    MyApp.addToList($thingList);
  });

// Adds hover effect
  $thingList.on('mouseenter mouseleave', 'li', function(event) {
       if (event.type == 'mouseenter') {
         $(this).removeClass('inactive');
         $(this).siblings().addClass('inactive');
      } else if (event.type == 'mouseleave') {
          $(this).siblings().removeClass('inactive');
      }
  });

// Crosses out items that have been completed
  $thingList.on('click', 'a.complete', function(e) {
    e.preventDefault();
    var listItem = $(this).parent('li');

    listItem.toggleClass('completed');
  });

// Remove items from list
  $thingList.on('click', 'a.delete', function(e) {
    e.preventDefault();
    $(this).parent('li').remove();
  });

  MyApp.initiateButtons($thingList);
});
