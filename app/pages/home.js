import { html, useEffect, useState } from 'z-js-framework';
import { Button } from '../components/button';

// example of a simple z app page - non reactive, see pages/about
export default function Home() {
  const [count, setCount] = useState(0);

  // define ui
  const UI = html`
    <main class="container flex-col">
      <img
        src="../public/z-banner.jpeg"
        alt="Z Banner"
        style="width: 100px; height: 100px; border-radius: 4px;" />
      <h1>Z App!</h1>
      <p>
        Awesome count: <span id="count" style="color: green;">${count}</span>
      </p>
      ${Button({
        text: '+ Add One',
        onClick: () => setCount(count.current() + 1),
      })}
      <div class="flex-row">
        <z-link to="/about">About</z-link>
        <a href="https://www.google.com">Just Google</a>
      </div>
    </main>
  `;

  // runs everytime count updates
  useEffect(() => {
    const countElement = UI.querySelector('#count');
    countElement.innerHTML = count.current();
  }, [count]);

  return UI;
}
