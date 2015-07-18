$(document).ready(function(){
$('#shareme').sharrre({
  share: {
    facebook: true,
    twitter: true,
    googlePlus: true,
    linkedin: true
  },
  enableHover: false,
  enableCounter: false,
  enableTracking: true,
  buttons: {
    googlePlus: {size: 'tall', annotation:'bubble'},
    facebook: {layout: 'box_count', size: 'tall'},
    twitter: {count: 'vertical'},
    linkedin: {counter: 'top'}
  },
  hover: function(api, options){
    $(api.element).find('.buttons').show();
  },
  hide: function(api, options){
    //$(api.element).find('.buttons').hide();
  }
});
  });



