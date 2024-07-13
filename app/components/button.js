import { css, html } from 'z-js-framework';

const buttonStyles = css`
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #eee;
  color: #333;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: #ddd;
  }
`;

export const Button = (props) => {
  return html`
    <button class="some-class ${buttonStyles}" onClick="${props.onClick}">
      ${props.text}
    </button>
  `;
};
