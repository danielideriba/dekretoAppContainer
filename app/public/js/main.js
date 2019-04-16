$(document).ready(function(){
  $('.delete-user').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    const currentPath = $target.attr('data-path');
    $.ajax({
      type:'DELETE',
      url:currentPath+'/'+id,
      success: function(response){
        console.log('Deletado o id '+id);
        window.location.href=currentPath+'/list?action=del'+id
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});

jQuery(function($){
  //Mask input fields
  //$("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("#phone-validate").mask("(99)9999-9999");
  $("#datemask").mask("99/99/9999");
  $(".hourmask").mask("99:99");
});
