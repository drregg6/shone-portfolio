export default function(phone) {
  if (phone[0] === '1') {
    phone = phone.slice(1);
  }
  if (phone.length > 10) {
    phone = phone.substring(0,10);
  }
  return `(${phone.substring(0,3)}) ${phone.substring(3,6)}.${phone.substring(6)}`;
}