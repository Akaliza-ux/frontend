import { load, save } from './storage.js';

export let records = load();
export let cap = Number(localStorage.getItem('finance:cap') || 0);

export function addRecord(rec) {
  records.push(rec);
  save(records);
}

export function updateRecord(id, updated) {
  records = records.map(r => (r.id === id ? { ...r, ...updated, updatedAt: new Date().toISOString() } : r));
  save(records);
}

export function deleteRecord(id) {
  records = records.filter(r => r.id !== id);
  save(records);
}

export function setCap(value) {
  cap = Number(value);
  localStorage.setItem('finance:cap', cap);
}
