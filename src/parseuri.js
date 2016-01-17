/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

/* eslint-disable */
export const regex = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
/* eslint-enable */

const parts = [
	'source',
	'protocol',
	'authority',
	'userInfo',
	'user',
	'password',
	'host',
	'port',
	'relative',
	'path',
	'directory',
	'file',
	'query',
	'anchor',
];

export default function parseuri(str) {
	const src = str;
	const b = str.indexOf('[');
	const e = str.indexOf(']');

	if (b !== -1 && e !== -1) {
		str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length); // eslint-disable-line
	}

	const m = regex.exec(str || '');
	if (!m) {
		return null;
	}

	const uri = {};
	let i = 14;

	while (i--) {
		uri[parts[i]] = m[i] || '';
	}

	if (b !== -1 && e !== -1) {
		uri.source = src;
		uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
		uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
		uri.ipv6uri = true;
	}

	return uri;
}
