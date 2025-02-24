import "./main.scss";
let selectedRegulation = "";
let regulations = [
  {
    id: "2014-33-EU",
    label: "2014/33/EU",
  },
  {
    id: "2166-42-AT",
    label: "2166/42/AT",
  },
  {
    id: "93-42-EC",
    label: "93/42/EC",
  },
  {
    id: "305-2011-EU",
    label: "305/2011/EU",
  },
  {
    id: "EN1090",
    label: "EN1090",
  },
];
$(document).ready(function () {
  for (let i = 0; i < regulations.length; i++) {
    const element = regulations[i];
    $("#dropdown ul").append(
      $("<li>").append(
        $("<a>", {
          id: element.id,
          class:
            "inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
          text: element.label,
        })
      )
    );
    $(`#${element.id}`).click(function (e) {
      e.preventDefault();
      const selected = $(this).attr("id");
      selectedRegulation = regulations.find((item) => item.id == selected);
      $("#dropdown-button").click();
      $("#dropdown-button .txt-area").text(selectedRegulation.label);
    });
  }

  $("#dropdown-button").click(function (e) {
    e.preventDefault();
    if ($("#dropdown").hasClass("hidden")) {
      $("#dropdown").removeClass("hidden");
    } else {
      $("#dropdown").addClass("hidden");
    }
  });
  // $("#search-dropdown").val("357.22722/357.22722/UF-VIII/2025");
  $("#search-dropdown").keyup(function (e) {
    e.preventDefault();
    const item = $("#search-dropdown").val();
    $("#search-dropdown").val(item.toUpperCase());
  });
  $("#search-btn").click(function (e) {
    e.preventDefault();
    if (!$("#search-dropdown").val()) {
      //Bu alan Boş olamaz
      return;
    }
    console.log(selectedRegulation);
    console.log($("#search-dropdown").val());
    $.ajax({
      type: "POST",
      url: "/api/cq",
      data:{
        legislation: selectedRegulation.label,
        cert_no: $("#search-dropdown").val(),
      },
      dataType: "json",
      success: function (response) {
        console.log("response", response);
        const{msg} = response;
        $('#docVer').removeClass('hidden');
        $('#articArea').addClass('hidden');
        if(msg == 'Finded'){
          $('#docVer table').removeClass('hidden');
          $('#noCert').addClass('hidden');
          $("#docVer table tbody").html('');
          delete response['msg'];
          $.map(response,function(val,key){
            if(key !== 'id'){
              let Keys = key.split('_').map((item)=>{
                return String(item).charAt(0).toUpperCase() + String(item).slice(1)
              });
              newKey = '';
              for (let I = 0; I < Keys.length; I++) {
                newKey += I > 0 ? ' ' + Keys[I]: Keys[I]; 
              }
              $("#docVer table tbody").append($('<tr>').append($('<td>',{text:`${newKey}`})).append($('<td>',{text:`${val}`})));
            }
      
          })
        }else{
          $('#docVer table').addClass('hidden');
          $('#noCert').removeClass('hidden');
        }

      },
    });
  });
});
