$(function () {
  $("#btn").click(getRequest);

  function getRequest() {
    let url = $("#req-url").val();
    let response = $("#select-req").val();

    switch (response) {
      case "jQuery":
        jQueryRequest(url); //jQuery ajax call
        break;

      case "Axios":
        axiosRequest(url); //jQuery ajax call
        break;

      case "Fetch":
        fetchRequest(url); //jQuery ajax call
        break;

      default:
        ajaxCall(url); //Ajax call
        break;
    }
  }

  //Fetch call

  function fetchRequest(url) {
    fetch(url, {
      method: "GET",
    })
      .then(function (data) {
        return data.json();
      })
      .catch((err) => {
        $("#response-output").html(err);
      })
      .then(function (data) {
        let statusString = JSON.stringify(data);
        display(statusString, "Fetch Request.");
      });
  }

  //Axiox call

  function axiosRequest(url) {
    axios
      .get(url)
      .then(function (data) {
        let statusString = JSON.stringify(data);
        display(statusString, "Axiox Request.");
      })
      .catch((err) => {
        $("#response-output").html(err);
      });
  }

  //jQuery ajax call

  function jQueryRequest(url) {
    $.ajax({
      url: url,
      type: "GET",
    }).done(function (res) {
      let statusString = JSON.stringify(res);

      display(statusString, "jQuery Ajax Request.");
    });
  }

  // ajax call

  function ajaxCall(url) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let statusString = this.responseText;

        display(statusString, "AJAX Request.");
      }
    };

    xhr.open("GET", url, true);
    xhr.send();
  }

  //Display function

  function display(statusString, type) {
    $("#response-output").html(statusString);
    $("#status").html("Successful");
    // $("#type").html("AJAX Request.");
    $("#type").html(type);
  }
});
