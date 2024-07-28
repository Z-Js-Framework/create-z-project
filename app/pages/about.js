import { css, html, reactive, useState } from 'z-js-framework';

const inputStyles = css`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-radius: 4px;
  background-color: #eee;
  border: 2px solid #000;
  color: #333;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #ddd;
  }
`;

export default function About() {
  const [name, setName] = useState('type your name here, delete this!');

  const UI = () => html`
    <main class="container flex-col">
      <h1>Z About</h1>
      <p>Name: ${name}</p>
      <input
        type="text"
        onChange="${(e) => setName(e.target.value)}"
        class="${inputStyles}"
        value="${name}" />
      <div class="flex-row">
        <z-link to="/">Home</z-link>
        <z-link to="/listing">Legends</z-link>
        <z-link to="/todos">Fetching</z-link>
        <a href="https://www.google.com">Just Google</a>
      </div>
    </main>
  `;

  // you wrap UI function in a reactive, it automatically updates UI when state changes
  return reactive(UI);
}
