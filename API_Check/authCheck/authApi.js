function getUserToken(callback) {
  $.ajax({
    type: "GET",
    url: "../schemas/user",
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      console.log("인증에 성공했습니다.");
      callback(response.user);
    },
    error: function (xhr, status, error) {
      if (status == 401) {
        alert("로그인이 필요합니다.");
      } else {
        localStorage.clear();
        alert("알 수 없는 문제가 발생했습니다. 관리자에게 문의하세요.");
      }
      window.location.href = "/";
    },
  });
}

function signOut() {
  console.log("로그아웃 되었습니다.");
  localStorage.clear();
  window.location.href = "/";
}
