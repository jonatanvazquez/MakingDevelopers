import { md5 } from './utils/security';

export function createInput(attrs) {
  let html = '<input ';
  const type = attrs.type;
  const hasType = attrs.hasOwnProperty('type');
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasType) {
    html += 'type="text" ';
  }

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="input" ';
  }

  attrs.forIn((value, attr) => {
    if (attr === 'name') {
      value = md5(value);
    }

    if (value !== '') {
      html += `${attr}="${value}" `;
    }
  });

  html += ' />';

  return html;
}

export function createTextarea(attrs) {
  let html = '<textarea ';
  let content = '';
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="textarea" ';
  }

  attrs.forIn((value, attr) => {
    if (attr === 'name') {
      value = md5(value);
    }

    if (attr === 'value' && value !== '') {
      content = value;
    } else if (value !== '') {
      html += `${attr}="${value}" `;
    }
  });

  html += `>${content}</textarea>`;

  return html;
}

export function createSelect(attrs) {
  const options = attrs.options.split('|');
  const type = attrs.type;
  const hasClass = attrs.hasOwnProperty('class');
  let html = '<select ';
  let value;

  if (!hasClass && type !== 'hidden' && type !== 'checkbox' && type !== 'radio') {
    html += 'class="select" ';
  }

  attrs.forIn((value, attr) => {
    if (attr === 'name') {
      value = md5(value);
    }

    if (value !== '') {
      html += `${attr}="${value}" `;
    }
  });

  html += '>';

  options.forEach(option => {
    html += `<option>${option}</option>`;

    if (option.indexOf(':') > -1) {
      value = option.substr(0, option.indexOf(':'));
      option = option.substr(option.indexOf(':') + 1);

      html += `<option value="${value}">${option}</option>`;
    }
  });

  html += '</select>';

  return html;
}

export function createLabel(attrs, text) {
  let html = '<label ';

  attrs.forIn((value, attr) => {
    html += `${attr}="${value}" `;
  });

  html += `>${text}</label>`;

  return html;
}