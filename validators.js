export const patterns = {
  description: /^\S(?:.*\S)?$/,
  amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWord: /\b(\w+)\s+\1\b/
};

export function validate(desc, amount, date, category) {
  if (!patterns.description.test(desc)) return 'Invalid description';
  if (!patterns.amount.test(amount)) return 'Invalid amount';
  if (!patterns.date.test(date)) return 'Invalid date';
  if (!patterns.category.test(category)) return 'Invalid category';
  if (patterns.duplicateWord.test(desc)) return 'Duplicate word in description';
  return '';
}
