export function formatPrice(amount) {
  return `৳${Number(amount).toLocaleString()}`;
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validatePassword(password) {
  const errors = [];
  if (password.length < 6) errors.push("At least 6 characters required");
  if (!/[A-Z]/.test(password)) errors.push("One uppercase letter required");
  if (!/[a-z]/.test(password)) errors.push("One lowercase letter required");
  return errors;
}

export function getStatusColor(status) {
  const map = {
    pending: "warning",
    confirmed: "primary",
    cancelled: "error",
  };
  return map[status] || "info";
}
