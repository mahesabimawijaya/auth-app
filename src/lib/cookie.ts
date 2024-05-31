export function getCookie(name: string) {
  if (typeof document !== "undefined") {
    let cookieValue = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return cookieValue ? cookieValue.pop() : "";
  }
  return "";
}
