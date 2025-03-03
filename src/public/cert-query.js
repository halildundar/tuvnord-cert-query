import "./cert-query.scss";

$(document).ready(function () {
    console.log('init')
  $("#search-btn").click(async function (e) {
    e.preventDefault();
    if (!$("#search-txt").val()) {
      //Bu alan Boş olamaz
      return;
    }
    console.log($("#search-txt").val())
    const response = await $.ajax({
      type: "POST",
      url: "/cert-query",
      data:JSON.stringify( {
        cert_no: $("#search-txt").val(),
      }),
      dataType: "json",
      contentType:"application/json"
    });
    if (!!response) {
      console.log("response", response);
      const { msg } = response;
      $("#docVer").removeClass("hidden");
      $("#articArea").addClass("hidden");
      if (msg == "Finded") {
        $("#docVer table").removeClass("hidden");
        $("#noCert").addClass("hidden");
        $("#docVer table tbody").html("");
        delete response["msg"];
        $.map(response, function (val, key) {
          if (key !== "id") {
            let Keys = key.split("_").map((item) => {
              return (
                String(item).charAt(0).toUpperCase() + String(item).slice(1)
              );
            });
            newKey = "";
            for (let I = 0; I < Keys.length; I++) {
              newKey += I > 0 ? " " + Keys[I] : Keys[I];
            }
            $("#docVer table tbody").append(
              $("<tr>")
                .append($("<td>", { class:'bg-black/20',text: `${newKey}` }))
                .append($("<td>", { text: `${val}` }))
            );
          }
        });
      } else {
        $("#docVer table").addClass("hidden");
        $("#noCert").removeClass("hidden");
      }
    }
  });
});
