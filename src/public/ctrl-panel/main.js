import "./main.scss";
import "./jqform-serialize.js";
import { InitPage } from "./router.js";

$(document).ready(function () {
  const currPath = window.location.pathname;
  InitPage();
  if(currPath == '/ctrl-panel/login'){
    $("script[src='/ctrl-panel/main.js']").before(
      "<script src='https://www.google.com/recaptcha/api.js?render=6Lf2FrEqAAAAAEc8D39aAZOsihEZATb-UUOHCzc8'></script>"
    );
    // $("#email").val("halildundar.eee@gmail.com");
    // $("#passw").val("153ud153");
  
    $(".eyeStatus").on('click',function(e){
      e.preventDefault();
      if($(".eyeStatus i").html() == 'hidden'){
        $(".eyeStatus i").html('visible');
        $("#passw").attr("type", "text");
      }else{
        $(".eyeStatus i").html('hidden');
        $("#passw").attr("type", "password");
      }
    });
    var timer = setInterval(() => {
      if (!!grecaptcha) {
        clearInterval(timer);
        grecaptcha.ready(() => {
          if (!$(".spinner-area").hasClass("hidden")) {
            $(".spinner-area").addClass("hidden");
          }
          grecaptcha
            .execute("6Lf2FrEqAAAAAEc8D39aAZOsihEZATb-UUOHCzc8")
            .then(function (token) {
              $("#sendbtn").on('click',function () {
                var email = $("#email").val();
                var passw = $("#passw").val();
  
                if ($(".spinner-area").hasClass("hidden")) {
                  $(".spinner-area").removeClass("hidden");
                }
                const sendedData = JSON.stringify({
                  email,
                  passw,
                  recaptchaToken: token,
                });
                $.ajax({
                  type: "post",
                  url: "/ctrl-panel/login",
                  data: sendedData,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: (data) => {
                    const { ok} = data;
                    if(ok){
                      window.location.pathname = "/ctrl-panel/";
                    }
                    // window.location.pathname = "/ctrl-panel/";
                    // window.location.pathname = "/ctrl-panel/";
                  },
                  error: function (xhr, statusText, errorThrown) {
                    var { responseJSON } = xhr;
                    $(".error-area").append(`
                      <div>${responseJSON.msg}</div>
                      `);
                    if (!$(".spinner-area").hasClass("hidden")) {
                      $(".spinner-area").addClass("hidden");
                    }
                
                    // throw Error(error + ":" + thrown);
                  },
                });
              });
            });
        });
      }
    }, 500);
    const FormData = $("form").serializeArray();
  }
});
