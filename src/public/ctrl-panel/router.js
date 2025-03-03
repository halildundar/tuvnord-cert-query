import "./templates/dashboard.html";
import "./templates/404.html";
import "./templates/users.html";
import "./templates/certificates.html";
let User = null;
const Router = function (name, routes) {
  return {
    name: name,
    routes: routes,
  };
};
const Routes = new Router("myFirstRouter", [
  {
    path: "/ctrl-panel/",
    viewId: "#root_view",
    template: "dashboard.html",
    name: "Ctrl Panel Anasayfa",
    data: {},
  },
  {
    path: "/ctrl-panel/certificates",
    viewId: "#root_view",
    template: "certificates.html",
    name: "CE Belgeleri",
    data: {},
  },
  {
    path: "/ctrl-panel/users",
    viewId: "#root_view",
    template: "users.html",
    name: "Sistem Kullanıcılar",
    data: {},
  }
]);
const IsAuthGet = (routePath) => {
  const route = Routes.routes.filter(function (r) {
    return r.path.includes(routePath);
  })[0];
  $.ajax({
    type: "POST",
    url: "/ctrl-panel/get-user",
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      console.log("response", response);
      // GoToPage(route.path, route.viewId, route.data);
      if (!!response) {
        User = response;
        if (!!route) {
          GoToPage(route.path, route.viewId, route.data);
        } else {
          GoToPage(routePath, "#root_view", {});
        }
      } else {
        User = null;
        if(routePath !== "/ctrl-panel/login"){
          window.location.pathname = "/ctrl-panel/login";
        }
      }
    },
  });
};
const GetBtnRoutes = () => {
  const routes = $("[route]");
  $.map(routes, (el) => {
    $(el).unbind("click");
    $(el).click(function (e) {
      const routePath = $(el).attr("route");
      IsAuthGet(routePath);
    });
  });
};
const IfUserActiveForDom = () => {
  console.log(User);
  if (!User) {
    $(".login").each(function (index) {
      $(this).removeClass("flex");
      $(this).addClass("hidden");
    });
  } else {
    $(".login").each(function (index) {
      $(this).removeClass("hidden");
      $(this).addClass("flex");
    });
  }
};
const UsersAreaJS = () => {
  let selectedUser = null;
  const pathname = window.location.pathname;

  const onClear = () => {
    $("input[name='passw']").val("");
    $("input[name='name']").val("");
    $("input[name='email']").val("");
    $("select[name='role']").val("user");
    $("table tbody tr").each(function () {
      $(this).removeClass("bg-black/10");
    });
    $(".btn-blue").removeClass("hidden");
    $(".btn-orange").addClass("hidden");
    $(".btn-purple").addClass("hidden");
    $(".btn-red").addClass("hidden");
    selectedUser = null;
  };
  const onSave = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/users/save-user",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        onGetUsers();
      },
    });
  };
  const onDelete = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/users/delete-user",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        onGetUsers();
      },
    });
  };
  const onUpdate = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/users/update-user",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        onGetUsers();
      },
    });
  };
  const onGetUsers = () => {
    onClear();
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/users/get-users",
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        const { users } = response;
        if (!!users) {
          $("table tbody").html("");
          $.map(users, function (user, index) {
            $(`.trow${user.id}`).unbind();
            $("table tbody").append(`
              <tr class="trow${user.id} cursor-pointer hover:bg-black/10 duration-200">
                <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.9rem] text-start">${user.name}</td>
                <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.9rem] text-start">${user.email}</td>
               <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.9rem] text-start">${user.role}</td>
              </tr>
            `);
            $(`.trow${user.id}`).click(function (e) {
              e.preventDefault();
              selectedUser = user;
              $("table tbody tr").each(function () {
                $(this).removeClass("bg-black/10");
              });
              $(this).addClass("bg-black/10");
              $("input[name='passw']").val(user.passw);
              $("input[name='name']").val(user.name);
              $("input[name='email']").val(user.email);
              $("select[name='role']").val(user.role);

              $(".btn-blue").addClass("hidden");
              $(".btn-orange").removeClass("hidden");
              $(".btn-purple").removeClass("hidden");
              $(".btn-red").removeClass("hidden");
            });
          });
        }
      },
    });
  };
  if (pathname === "/ctrl-panel/users") {
    onGetUsers();
    $(".btn-purple").click(onClear);
    $(".btn-orange").click(function (e) {
      let formData = {};
      $.map($("form").serializeArray(), function (item) {
        formData[item.name] = item.value;
      });
      onUpdate({ id: selectedUser.id, queryData: formData });
    });
    $(".btn-red").click(function (e) {
      onDelete({ id: selectedUser.id });
    });
    $(".btn-blue").click(function (e) {
      let formData = [];
      $.map($("form").serializeArray(), function (item) {
        formData.push(item.value);
      });
      onSave({ queryData: formData });
    });
  }
};

const CertQueryAreaJS = () => {
  let selectedCert = null;
  const sitename = "https://nervous-herschel.89-250-72-218.plesk.page/,";//https://nervous-herschel.89-250-72-218.plesk.page/, "http://localhost:3000/"
  const pathname = window.location.pathname;
  const GetQR = async (text,name) => {
    const resp = await $.ajax({
      type: "POST",
      url: "/ctrl-panel/qr/qetQr",
      data: JSON.stringify({ text: text,name }),
      dataType: "json",
      contentType: "application/json"
    });
    console.log(resp)
    return resp;
  };
  const CertificateSorguImgArea = async () => {
    const data = await GetQR(sitename + "certquery/",'cert_qeury_url');
    $(".certqueryqr img").remove();
    $(".certqueryqr").append(data['imgEl']);
  };
  const SelectedCertQr = async (cert_id)=>{
    const data = await GetQR(sitename + "certquery/cqn=" +cert_id,cert_id);
    $(".selectedcertqueryqr").removeClass('hidden');
    $(".selectedcertqueryqr img").remove();
    $(".selectedcertqueryqr").append(data['imgEl']);
  }
  const onClear = () => {
    $("input[name='cert_no']").val("");
    $("input[name='trade_name']").val("");
    $("input[name='product_range']").val("Lifts");
    $("select[name='legislation']").val("2014/33/EU Lifts and Safety Components For Lifts");
    $("select[name='module']").val("Unit Verification-Annex VIII-Module G");
    $("select[name='status']").val("Active");
    $("select[name='standarts']").val("EN81-20:2020,EN81-50:2020");
    $("input[name='product_features']").val("");
    $("input[name='start_date']").val("");
    $("input[name='expration_date']").val("");

    $("table tbody tr").each(function () {
      $(this).removeClass("bg-black/10");
    });
    $(".btn-blue").removeClass("hidden");
    $(".btn-orange").addClass("hidden");
    $(".btn-purple").addClass("hidden");
    $(".btn-red").addClass("hidden");
    selectedCert = null;
    $(".selectedcertqueryqr").addClass('hidden');
    $(".selectedcertqueryqr img").remove();
  };
  const onSave = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/certificates/save-cert",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        onGetCerts();
      },
    });
  };
  const onDelete = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/certificates/delete-cert",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        console.log(response);
        onGetCerts();
      },
    });
  };
  const onUpdate = (data) => {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/certificates/update-cert",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        onGetCerts();
      },
    });
  };
  const onGetCerts = () => {
    onClear();
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/certificates/get-certs",
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        const { certs } = response;
        if (!!certs) {
          $("table tbody").html("");
          $.map(certs, function (cert, index) {
          
            let modulename = "";
            $.each(cert.module.split("-"), function (index, txt) {
              modulename += index == 1 ? txt + "-" : index == 2 ? txt : "";
            });

            $(`.trow${cert.id}`).unbind();
            $("table tbody").append(`
              <tr class="trow${cert.id} cursor-pointer hover:bg-black/10 duration-200">
                <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start w-[200px]" title="${cert.trade_name}">${cert.trade_name}</td>
                <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start" title="${cert.cert_no}">${cert.cert_no}</td>
               <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start  w-[200px] " title="${modulename}">${modulename}</td>
               <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start" title="${cert.status}">${cert.status}</td>
               <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start" title="${cert.start_date}">${cert.start_date}</td>
               <td class="border-t border-l border-gray-300 px-2 py-1 text-[0.8rem] text-start" title="${cert.expration_date}">${cert.expration_date}</td>
             
              </tr>
            `);
            $(`.trow${cert.id}`).click(function (e) {
              e.preventDefault();
            
              selectedCert = cert;
              $("table tbody tr").each(function () {
                $(this).removeClass("bg-black/10");
              });
              $(this).addClass("bg-black/10");
              $("input[name='cert_no']").val(cert.cert_no);
              $("input[name='trade_name']").val(cert.trade_name);
              $("select[name='legislation']").val("2014/33/EU Lifts and Safety Components For Lifts");
              $("input[name='product_range']").val("Lifts");
              $("select[name='module']").val(cert.module);
              $("select[name='status']").val(cert.status);
              $("select[name='standarts']").val("EN81-20:2020,EN81-50:2020");
              $("input[name='product_features']").val(cert.product_features);
              $("input[name='start_date']").val(cert.start_date);
              $("input[name='expration_date']").val(cert.expration_date);
              $("input[name='release_date']").val(cert.release_date);
              $("input[name='registration_deadline']").val(
                cert.registration_deadline
              );

              $(".btn-blue").addClass("hidden");
              $(".btn-orange").removeClass("hidden");
              $(".btn-purple").removeClass("hidden");
              $(".btn-red").removeClass("hidden");
              SelectedCertQr(cert.cert_id);
            });
          });
        }
      },
    });
  };
  if (pathname === "/ctrl-panel/certificates") {
    onGetCerts();
    $(".btn-purple").click(onClear);
    $(".btn-orange").click(function (e) {
      let formData = {};
      $.map($("form").serializeArray(), function (item) {
        formData[item.name] = item.value;
      });
      onUpdate({
        id: selectedCert.id,
        queryData: { ...formData, cert_id: selectedCert.cert_id },
      });
    });
    $(".btn-red").click(function (e) {
      onDelete({ id: selectedCert.id });
    });
    $(".btn-blue").click(function (e) {
      let formData = [];
      $.map($("form").serializeArray(), function (item) {
        formData.push(item.value);
      });
      onSave({ queryData: formData });
    });
    CertificateSorguImgArea();
  }
};
const LogOutBtn = () => {
  $("#logoutbtn").click(function () {
    $.ajax({
      type: "POST",
      url: "/ctrl-panel/logout",
      dataType: "json",
      contentType: "application/json",
      success: function (response) {
        window.location.pathname = "/ctrl-panel/login";
      },
    });
  });
};
const ShowTemplate = async (routePath, viewId) => {
  const route = Routes.routes.filter(function (r) {
    return r.path.includes(routePath);
  })[0];

  $(viewId).html("");
  if (!!route) {
    const resp = await fetch(`./templates/${route.template}`);
    const content = await resp.text();
    const rendered = Handlebars.compile(content);

    $(viewId).html(
      rendered({
        name: "Halil Dündar",
      })
    );
    LogOutBtn();
  } else {
    const resp = await fetch("./templates/404.html");
    const content = await resp.text();
    const temp404 = Handlebars.compile(content);
    $(viewId).html(temp404);
  }
  GetBtnRoutes();
  IfUserActiveForDom();
  UsersAreaJS();
  CertQueryAreaJS();
};
const GoToPage = (routePath, viewId, data) => {
  window.history.pushState(data, "", routePath);
  ShowTemplate(routePath, viewId);
  GetBtnRoutes();
};
export const InitPage = () => {
  let currPath = window.location.pathname;
  IsAuthGet(currPath);
};
