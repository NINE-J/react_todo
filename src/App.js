import "./App.css";
import React, { useState /* useEffect */ } from "react";

// ### item model ###
// {
//   id: 1,
//   text: '',
//   checked: true,
// }

function IcoCircle({ width, height, fill = "currentColor" }) {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      className={`bi bi-check-circle ${isHovering ? "" : "opacity-40"}`}
      viewBox="0 0 16 16"
      onMouseEnter={() => setIsHovering(1)}
      onMouseLeave={() => setIsHovering(0)}
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    </svg>
  );
}

function IcoCheckCircle({ width, height, fill = "currentColor" }) {
  const [isHovering, setIsHovering] = useState(0);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      className={`bi bi-check-circle ${isHovering ? "" : "opacity-40"}`}
      viewBox="0 0 16 16"
      onMouseEnter={() => setIsHovering(1)}
      onMouseLeave={() => setIsHovering(0)}
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
    </svg>
  );
}

function IcoDelete({ width, height, fill = "currentColor" }) {
  const [isHovering, setIsHovering] = useState(0);
  const hoveringFill = "#FF284F";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={isHovering ? hoveringFill : fill}
      className="bi bi-check-circle"
      viewBox="0 0 16 16"
      onMouseEnter={() => setIsHovering(1)}
      onMouseLeave={() => setIsHovering(0)}
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
    </svg>
  );
}

function Header() {
  return <h1 className="font-bold text-6xl py-6 text-slate-400">Test</h1>;
}

function InputBox(props) {
  const [text, setText] = useState("");

  const completeAll = () => {
    props.setTodoList(
      props.todoList.map((el) => {
        el.checked = true;
        return el;
      })
    );
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    const onReset = () => {
      setText("");
    };

    if (e.key === "Enter" && text) {
      // 조합 문자(한글, 한문 등)의 경우 이벤트가 두 번 발생하여 끝 글자가 출력되는 이슈가 있다.
      // 브라우저의 nativeEvent에서 isComposing을 확인하여 조합 문자인지 구분하고 이를 다룰 수 있다.
      if (e.nativeEvent.isComposing) return;

      let newId = window.self.crypto.randomUUID();
      let data = { id: newId, text, checked: false };
      props.setTodoList(props.todoList.concat(data));
      onReset();
    }
  };

  return (
    <div className="flex items-center px-4">
      <button onClick={completeAll}>
        <IcoCheckCircle width="32" height="32" fill="#333" />
      </button>
      <input className="w-full h-16 px-6 py-2" onChange={onChange} value={text} onKeyDown={handleKeyDown} />
    </div>
  );
}

function Item(props) {
  const id = props.id;
  const toggleCheck = () => {
    return props.setTodoList(
      props.todoList.map((el) => {
        if (el.id === id) el.checked = !el.checked;
        return el;
      })
    );
  };
  const deleteItem = (id) => {
    return props.setTodoList(props.todoList.filter((el) => el.id !== id && el));
  };

  return (
    <li className="item flex items-center h-16 px-4 py-2 border-t border-slate-200">
      <button onClick={toggleCheck}>
        {props.checked ? (
          <IcoCheckCircle width="32" height="32" fill="#333" />
        ) : (
          <IcoCircle width="32" height="32" fill="#333" />
        )}
      </button>
      <span className="ml-4">{props.text}</span>
      <button
        className="ml-auto"
        onClick={() => {
          deleteItem(id);
        }}
      >
        <IcoDelete width="24" height="24" fill="#999" />
      </button>
    </li>
  );
}

function List({ todoList, setTodoList, filteredTodoList }) {
  return (
    <ul className="list_wrapper">
      {todoList && //is todoList
        filteredTodoList.map(
          (item) =>
            item && (
              <Item
                id={item.id}
                text={item.text}
                checked={item.checked}
                todoList={todoList}
                setTodoList={setTodoList}
                key={item.id}
              />
            )
        )}
    </ul>
  );
}

function Footer(props) {
  return (
    props.todoList.length > 0 && (
      <div className="footer relative h-16">
        <div className="absolute w-full px-6 py-2 flex justify-center items-center">
          <span className="txt mr-auto">{`${props.todoList.length} items left`}</span>
          <div
            className={`button_01 mr-2 px-4 py-2 border rounded cursor-pointer ${
              props.whichFilter === "all" ? "border-blue-600 text-blue-600" : "border-gray-500 text-gray-500"
            }`}
            onClick={() => {
              props.setWhichFilter("all");
            }}
          >
            전체
          </div>
          <div
            className={`button_02 mr-2 px-4 py-2 border rounded cursor-pointer ${
              props.whichFilter === "todo" ? "border-blue-600 text-blue-600" : "border-gray-500 text-gray-500"
            }`}
            onClick={() => props.setWhichFilter("todo")}
          >
            할 일
          </div>
          <div
            className={`button_03 px-4 py-2 border rounded cursor-pointer ${
              props.whichFilter === "completed" ? "border-blue-600 text-blue-600" : "border-gray-500 text-gray-500"
            }`}
            onClick={() => props.setWhichFilter("completed")}
          >
            완료
          </div>
        </div>
      </div>
    )
  );
}

function App() {
  const [whichFilter, setWhichFilter] = useState("all");
  const [todoList, setTodoList] = useState([]);
  const filteredTodoList = (type) => {
    if (type === "todo") return todoList.map((el) => !el.checked && el);
    else if (type === "completed") return todoList.map((el) => el.checked && el);
    else return todoList;
  };

  return (
    <div className="App min-h-screen bg-slate-100">
      <div id="wrap" className="flex-column justify-center items-center w-full md:w-1/3 py-24 mx-auto">
        <Header />
        <div className="bg-white drop-shadow-lg">
          <InputBox todoList={todoList} setTodoList={setTodoList} />
          <List todoList={todoList} setTodoList={setTodoList} filteredTodoList={filteredTodoList(whichFilter)} />
          <Footer todoList={todoList} whichFilter={whichFilter} setWhichFilter={setWhichFilter} />
        </div>
      </div>
    </div>
  );
}

export default App;
