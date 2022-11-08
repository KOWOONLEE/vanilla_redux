import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const ADD = "ADD";
const MINUS = "MINUS";

//data를 modify하는 함수
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

//data를 저장하는 곳
const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

//change를 store에서 감지하고 싶다면 그 change를 구독하면 됨.
countStore.subscribe(onChange);

//data의 store를 만들고(create하고)
//data의 modifier가 countModifier이라는 것을 알고
// 메세지를 그 store에 보내면 됨.
//전송한 메세지는 action에 넣으면 되고 내가 할 일은 action을 체크해보면 됨. (action은 무조건 객체)

const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};
const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
