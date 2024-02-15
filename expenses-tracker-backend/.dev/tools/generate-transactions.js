const moment = require('moment');
const uuid = require('uuid');

const user_ids = [
  '3bc17849-51e3-4882-a98f-acecf11322ab',
  '0b36fbfa-eead-4196-9de5-4810757959b0',
]; // Replace with actual user IDs from your DB
const merchant_names = ['merchant1', 'merchant2', 'merchant3'];
const descriptions = ['description1', 'description2', 'description3'];
const currency = 'BGN';

const start_date = moment('2024-01-01');
const end_date = moment('2024-12-31');

for (let i = 0; i < 100; i++) {
  const date = start_date.add(
    Math.random() * (end_date - start_date),
    'milliseconds',
  );
  const query = `
    INSERT INTO public.transaction (
        id,
        created_at,
        merchant_name,
        date,
        amount,
        currency,
        description,
        owner_id
    ) VALUES (
        '${uuid.v4()}',
        '${date.format()}',
        '${merchant_names[Math.floor(Math.random() * merchant_names.length)]}',
        '${date.format()}',
        '${Math.floor(Math.random() * 1000 + 1)}',
        '${currency}',
        '${descriptions[Math.floor(Math.random() * descriptions.length)]}',
        '${user_ids[Math.floor(Math.random() * user_ids.length)]}'
    );
  `;

  console.log(query);
}
