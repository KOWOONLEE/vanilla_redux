import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";
import { formDataToBlob } from "formdata-polyfill/esm.min";
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

// ========================================

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      //return state.push(action.text) 이게 아니라 새로운 배열을 return 해야함.
      //...state를 뒤로 보내서 array 가 보이는 방식을 수정할 수 있음.
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};
const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const addToDo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
};

//parentNode를 알아야함. 왜냐면 삭제할 todo의 id가 필요하기 때문
const deleteToDo = (e) => {
  const id = e.target.parentNode.id;
  store.dispatch({ type: DELETE_TODO, id });
};

const paintToDos = () => {
  const toDos = store.getState();

  //이렇게 하면 계속 누적해서 리스트 쌓임. 아래 입력해줘야함.
  ul.innerHTML = "";

  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};
form.addEventListener("submit", onSubmit);
