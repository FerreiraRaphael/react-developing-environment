/**
 * Created by raphael on 23/04/17.
 */

function getQueryStringParameterByName(name, url) {
  const param = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${param}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url || window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function getBaseUrl() {
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001' : '';
}
