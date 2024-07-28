import { html } from 'z-js-framework';

export function TodoComponent(props) {
  return html`
    <div class="flex-row">
      <input
        type="checkbox"
        ${props.completed ? 'checked' : ''}
        onChange="${() => console.log(props.id)}" />
      <h3 id="/todos/${props.id}">${props.title}</h3>
    </div>
  `;
}
