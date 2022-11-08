import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

//data를 modify하는 함수
const countModifier = (count = 0, action) => {
  console.log(count, action);
  if (action.type === "ADD") {
    return count + 1;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else {
    return count;
  }
};
//data를 저장하는 곳
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

//data의 store를 만들고(create하고)
//data의 modifier가 countModifier이라는 것을 알고
// 메세지를 그 store에 보내면 됨.
//전송한 메세지는 action에 넣으면 되고 내가 할 일은 action을 체크해보면 됨.

const handleAdd = () => {
  countStore.dispatch({ type: "ADD" });
};
const handleMinus = () => {
  countStore.dispatch({ type: "MINUS" });
};
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
