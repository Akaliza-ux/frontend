import { records, deleteRecord } from './state.js';
import { highlight } from './search.js';

export function renderTable(re, container) {
  const tbody = container.querySelector('tbody');
  tbody.innerHTML = '';

  records.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${highlight(r.description, re)}</td>
      <td>${r.amount.toFixed(2)}</td>
      <td>${r.category}</td>
      <td>${r.date}</td>
      <td>
        <button class="edit" data-id="${r.id}">✏️</button>
        <button class="delete" data-id="${r.id}">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
