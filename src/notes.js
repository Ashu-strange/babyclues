const inputBox =  document.getElementById("input__text");
console.log(inputBox);
todoList = document.querySelector(".list__items ul");
selectClr = document.querySelectorAll(".cat__details span");
deletBtn = document.querySelector(".fi-rr-trash");
addBtn = document.querySelector(".add__btn");
let dataClr = "#e74c3c";

inputBox.addEventListener("focus", show__cat);
function show__cat(){
    document.querySelector(".cat__details").classList.add("show");
    inputBox.addEventListener('blur',function(){
        document.querySelector(".cat__details").classList.remove("show");
    });
}
selectClr.forEach((item) => {
  item.addEventListener("click",function(){
      dataClr = String(this.dataset.color);
      console.log(dataClr);
    })
  })
    addBtn.onclick = ()=>{ 
        let userEnteredValue = inputBox.value; 
        let getLocalStorageData = localStorage.getItem("New Todo"); 
        if(getLocalStorageData == null){
          listArray = [];
        }else{
          listArray = JSON.parse(getLocalStorageData);
        }
        listArray.push([userEnteredValue,dataClr]);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTasks();
      }
      function showTasks(){
        let getLocalStorageData = localStorage.getItem("New Todo");
        if(getLocalStorageData == null){
          listArray = [];
        }else{
          listArray = JSON.parse(getLocalStorageData); 
        }
        let newLiTag = "";
        listArray.forEach((element, index) => {
          newLiTag += `<li>
          <label for="check__item${index}" style="position:relative; left:-30px;">
              <div class="list__details">
                  <span class="check__box"></span>
                  <p style="margin-bottom: 0px;">${element[0]}</p>
              </div>
              <div class="cat__type" style="background:${element[1]};"></div>
          </label>
          <i class="fas fa-trash" onclick="deleteTask(${index})" style="right: 10px;"></i>
      </li>`;
        });
        todoList.innerHTML = newLiTag;
        inputBox.value = "";
      }
      function deleteTask(index){
        let getLocalStorageData = localStorage.getItem("New Todo");
        listArray = JSON.parse(getLocalStorageData);
        listArray.splice(index, 1);
        localStorage.setItem("New Todo", JSON.stringify(listArray));
        showTasks();
      }
  showTasks();