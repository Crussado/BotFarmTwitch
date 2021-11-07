const TIME_BUTTON = 900000;

function getButton() {
    return document.querySelectorAll('button.ScCoreButton-sc-1qn4ixc-0.ScCoreButtonSuccess-sc-1qn4ixc-5')[0];
}

function farm() {
    setTimeout(() => {
        getButton().click();
        farm();
    }, TIME_BUTTON);
}


function main () {
    farm();
}

// $(document).ready(function() {
    
//     llamar_ajax(); // al cargar el documento, se ejecutará dicha función

//     function llamar_ajax(){  // encapsular función ajax
//     var user_id = $("#mi_selector").attr('empresa_id'); // debes obtener el selector directo
//        $.ajax({
//        url: "{{url('admin/companies/editaddress')}}",
//        type: "POST",
//        data: '&empresa_id='+user_id,
//        success: function (data) {
//           $('.editContent').html(data);
//           $('#editAddressModal').modal('show');
//        },
//        dataType: 'html'
//     });
//     } // fin función
// });
// }

main();
