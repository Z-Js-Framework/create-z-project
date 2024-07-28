import {
  css,
  GET,
  getRef,
  html,
  setConfig,
  useEffect,
  useState,
} from 'z-js-framework';
import { Button } from '../components/button';
import { TodoComponent } from '../components/todo-item';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [limit, setLimit] = useState(0);

  setConfig({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    withCache: false,
  });

  const getTodos = async () => {
    const { data, error } = await GET('/todos');
    if (data) {
      console.log('Data::', data);
      return data;
    } else {
      console.error('Error::', error.message);
    }
    return [];
  };

  useEffect(async () => {
    let data = await getTodos();
    setTodos(data);
    loadList(data);
  }, []);

  const LoadingUI = html`<p>fetching todos..</p>`;

  const UI = html`
    <main class="container flex-col">
      <div class="flex relative">
        <h1>Z Todos...</h1>
        <div class="buttons">
          ${Button({
            text: '+ load more',
            onClick: () => loadList(todos.current()),
          })}
          ${Button({
            text: '- load few',
            onClick: () => loadList(todos.current(), 'minus'),
          })}
          ${Button({
            text: '* clear all',
            onClick: () => loadList([], 'clear'),
          })}
        </div>
      </div>
      <div class="flex">
        <section class="flex-col">
          <div class="flex-col" ref="listRef">${LoadingUI}</div>
        </section>
      </div>
      <div class="flex-row">
        <z-link to="/">Home</z-link>
        <z-link to="/about">About</z-link>
        <a href="https://www.google.com">Just Google</a>
      </div>
    </main>
  `;

  function loadList(items, action = 'plus') {
    // imperatively update the list
    const listRef = getRef('listRef');
    listRef.innerHTML = '';

    if (limit.current() < 200 && action === 'plus') {
      setLimit((current) => current + 10);
    } else if (limit.current() > 0 && action === 'minus') {
      setLimit((current) => current - 10);
    } else {
      listRef.innerHTML = 'No items to show!';
      setLimit(10);
      return;
    }

    let newList = [];
    for (let i = 0; i < limit.current(); i++) {
      newList.push(items[i]);
    }
    if (newList.length > 0) {
      newList.forEach((item) => {
        listRef.appendChild(
          TodoComponent({
            id: item.id,
            title: item.title,
            completed: item.completed,
          })
        );
      });
    } else {
      listRef.innerHTML = 'No items to show!';
    }
  }

  return UI;
}
