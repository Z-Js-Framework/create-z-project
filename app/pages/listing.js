import { getRef, html, List, useEffect, useState } from 'z-js-framework';
import { Button } from '../components/button';

const legendsList = [
  {
    id: 1,
    name: 'Linus Torvalds',
  },
  {
    id: 2,
    name: 'Brendan Eich',
  },
  {
    id: 3,
    name: 'Z Js',
  },
];

export default function Listing() {
  const [legends, setLegends] = useState(legendsList);

  const UI = html`
    <main class="container flex-col">
      <div class="flex">
        <h1>Z Listing...</h1>
        ${Button({
          text: '♻️ reload',
          onClick: () => updateList(legendsList),
        })}
      </div>
      <h2>Spot The Infamous Legend:</h2>
      <div class="flex-col" ref="listRef">
        ${List({
          ref: 'listRef',
          items: legends,
          render: ({ item }) =>
            LegendComponent({
              id: item.id,
              name: item.name,
              remove: (id) =>
                setLegends(legends.current().filter((l) => l.id !== id)),
            }),
        })}
      </div>
      <div class="flex-row">
        <z-link to="/">Home</z-link>
        <z-link to="/about">About</z-link>
        <a href="https://www.google.com">Just Google</a>
      </div>
    </main>
  `;
  useEffect(() => {
    updateList();
  }, [legends]);

  function updateList(newList = null) {
    const listRef = getRef('listRef');
    listRef.innerHTML = '';
    // imperatively update the list
    let list = newList || legends.current();
    list.forEach((legend) => {
      listRef.appendChild(
        LegendComponent({
          id: legend.id,
          name: legend.name,
          remove: (id) =>
            setLegends(legends.current().filter((l) => l.id !== id)),
        })
      );
    });
    if (!newList && legends.current().length === 0) {
      listRef.innerHTML = 'No legends yet, reload!';
    }
  }

  return UI;
}

function LegendComponent(props) {
  return html`
    <div class="flex-row">
      <p>🎖️ ${props.name}</p>
      ${Button({
        text: '❌',
        onClick: () => props.remove(props.id),
      })}
    </div>
  `;
}
