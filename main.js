import { records, addRecord, updateRecord, deleteRecord, setCap, cap } from './state.js';
import { renderTable } from './ui.js';
import { compileRegex } from './search.js';
import { validate } from './validators.js';
import { save } from './storage.js';

const form = document.getElementById('record-form');
const searchInput = document.getElementById('search');
const table = document.getElementById('records-table');
const formError = document.getElementById('form-error');
const capInput = document.getElementById('cap');
const exportBtn = document.getElementById('export-json');
const importInput = document.getElementById('import-json');

function refresh() {
  renderTable(compileRegex(searchInput.value), table);
  updateStats();
}

function updateStats() {
  const total = records.length;
  const sum = records.reduce((a, r) => a + Number(r.amount), 0);
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-sum').textContent = sum.toFixed(2);
  const topCat = records.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});
  const top = Object.entries(topCat).sort((a, b) => b[1] - a[1])[0];
  document.getElementById('stat-top').textContent = top ? top[0] : '-';

  const msg = document.getElementById('cap-status');
  if (cap && sum > cap) {
    msg.textContent = `⚠️ Over cap by $${(sum - cap).toFixed(2)}!`;
    msg.setAttribute('aria-live', 'assertive');
  } else if (cap) {
    msg.textContent = `✅ $${(cap - sum).toFixed(2)} remaining`;
    msg.setAttribute('aria-live', 'polite');
  } else msg.textContent = '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const desc = document.getElementById('desc').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  const error = validate(desc, amount, date, category);
  if (error) return (formError.textContent = error);

  addRecord({
    id: 'rec_' + Date.now(),
    description: desc,
    amount: parseFloat(amount),
    category,
    date,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  form.reset();
  formError.textContent = '';
  refresh();
});

searchInput.addEventListener('input', refresh);
table.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    if (confirm('Delete this record?')) {
      deleteRecord(id);
      refresh();
    }
  }
});

capInput.addEventListener('change', e => setCap(e.target.value));

exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'finance-data.json';
  a.click();
});

importInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (Array.isArray(data)) {
        localStorage.setItem('finance:data', JSON.stringify(data));
        location.reload();
      } else alert('Invalid JSON structure');
    } catch {
      alert('Failed to import JSON');
    }
  };
  reader.readAsText(file);
});

refresh();
