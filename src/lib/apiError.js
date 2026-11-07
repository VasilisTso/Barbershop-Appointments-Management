// Pull a human message out of an axios error. Handles `{ error }` and express-validator `{ errors: [{ msg, path }] }`.
export function apiErrorMessage(err, fallback = 'Something went wrong. Try again.') {
  const data = err?.response?.data;
  if (!err?.response) return 'Can’t reach the server. Check that the API is running.';
  if (data?.error) return data.error;
  if (Array.isArray(data?.errors) && data.errors.length) return data.errors[0].msg;
  return fallback;
}

// Map express-validator errors to { fieldName: message }.
export function apiFieldErrors(err) {
  const list = err?.response?.data?.errors;
  if (!Array.isArray(list)) return {};
  return list.reduce((acc, e) => {
    const key = e.path || e.param;
    if (key && !acc[key]) acc[key] = e.msg;
    return acc;
  }, {});
}
