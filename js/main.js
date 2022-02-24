let togleBtn = document.querySelector(".btn-show");
let nevber = document.querySelector("nav");
let paritem = document.querySelector("#links .content");
togleBtn.addEventListener("click", function () {
  nevber.classList.toggle("active");
});

let inpText = document.querySelector("input[type = text]");
let inpBtn = document.querySelector("input[type = submit]");
let re =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
inpBtn.addEventListener("click", function () {
  if (re.test(inpText.value) == false) {
    document.querySelector("#search .content").classList.add("error");
    inpText.classList.add("error");
  } else {
    fetch(`https://api.shrtco.de/v2/shorten?url=${inpText.value}`)
      .then((res) => res.json())
      .then((getdata) => {
        if (getdata.ok == false) {
          console.log(getdata.error);
          document.querySelector("#search .content").classList.add("error");
          inpText.classList.add("error");
        } else {
          let item = document.createElement("div");
          item.className = `item`;
          let leftdiv = document.createElement("div");
          leftdiv.className = `left`;
          let inpvalue = document.createElement("p");
          inpvalue.innerHTML = `${getdata.result.original_link}`;
          let rightdiv = document.createElement("div");
          rightdiv.className = `right`;
          let rigPr = document.createElement("p");
          rigPr.innerHTML = `${getdata.result.short_link}`;
          let btnrig = document.createElement("button");
          btnrig.innerHTML = `Copy`;
          leftdiv.appendChild(inpvalue);
          rightdiv.appendChild(rigPr);
          rightdiv.appendChild(btnrig);
          item.appendChild(leftdiv);
          item.appendChild(rightdiv);
          paritem.appendChild(item);
          inpText.classList.remove("error");
          document.querySelector("#search .content").classList.remove("error");
        }
      })
      .then((delet) => {
        let allitem = Array.from(
          document.querySelectorAll("#links .content .item button")
        );

        for (let i = 0; i < allitem.length; i++) {
          allitem[i].addEventListener("click", function () {
            if (allitem[i].classList.contains("copy")) {
              return false;
            } else {
              allitem[i].classList.add("copy");
              allitem[i].innerHTML = `Copied`;
              navigator.clipboard.writeText(
                allitem[i].parentElement.children[0].innerHTML
              );
            }
          });
        }
      });
  }
});
