const form = document.querySelector("#form");
const fileInput = document.querySelector("#img");
const imgPrev = document.querySelector("#img__preview");

fileInput.addEventListener("change", (e) => {
  const file = fileInput.files[0];

  const reader = new FileReader();

  reader.addEventListener("load", () => {
    imgPrev.src = reader.result;
  });

  reader.readAsDataURL(file);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value;
  const age = form.age.value;
  const img = imgPrev.getAttribute("src");

  const userInfo = {
    name,
    age,
    img,
  };

  await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
});

window.onload = async function () {
  await fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((data) => {
      const userInfoContainer = document.querySelector(".userInfo");

      console.log(data);
      const users = data;
      userInfoContainer.innerHTML = "";
      users.forEach((user) => {
        console.log(user.name);
        userInfoContainer.insertAdjacentHTML(
          "beforeend",
          `
                <div style="display: flex; gap: 2rem;">
                <h2 id="userName">${user.name}</h2>
                <h2 id="userAga">${user.age}</h2>
                <img src=${user.img} alt="" id="userImg" width="200px">
                </div>
             `
        );
      });
    });
};
