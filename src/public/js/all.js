document.addEventListener("DOMContentLoaded", (event) => {
  var courseId;
  var deleteCourseForm = document.forms["delete-course-form"];
  var exampleModal = document.getElementById("staticBackdrop");
  var btnDeleteCourse = document.getElementById("btn-delete-course");
  var checkAll = document.querySelector("#check-all");
  var courseItemCheck = document.querySelectorAll("input[name='courseIds[]']");

  exampleModal.addEventListener("show.bs.modal", function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    var recipient = button.getAttribute("data-id");
    courseId = recipient;
  });

  btnDeleteCourse.onclick = () => {
    deleteCourseForm.action = "/courses/" + courseId + "?_method=DELETE";
    deleteCourseForm.submit();
  };
  checkAll.onchange = (event) => {
    let isChecked = event.target.checked;
    if (isChecked) {
      for (let i of courseItemCheck) {
        i.checked = isChecked;
      }
    } else {
      for (let i of courseItemCheck) {
        i.checked = isChecked;
      }
    }
  };
  courseItemCheck.forEach((item) => {
    item.onchange = (event) => {
      var courseItemChecked = document.querySelectorAll(
        "input[name='courseIds[]']:checked"
      );
      let isChecked = courseItemCheck.length === courseItemChecked.length;
      checkAll.checked = isChecked;
      console.log(courseItemCheck.length);
      console.log(courseItemChecked.length);
    };
  });

  // console.log(courseItemCheck);
});
