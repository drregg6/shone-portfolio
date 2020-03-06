export default function(str) {
  str = str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();

  return str;
}