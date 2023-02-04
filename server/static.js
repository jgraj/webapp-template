import fs from 'fs';
import path from 'path';
import { app } from './main.js';

function load (path) { return fs.readFileSync(path); }
function mimeType (file) {
	switch (file.substring(file.lastIndexOf('.') + 1)) {
		case 'ico': return 'image/x-icon';
		case 'png': return 'image/png';
	}
}
function get (name, type, data) {
	app.get(`/${name}`, res => {
		res.onAborted(() => {});
		res.writeHeader('Content-Type', type);
		res.end(data);
	});
};

export function serveStatic () {
	fs.readdirSync('out').forEach(file => {
		if (file !== 'main.html') {
			get(file, mimeType(file), fs.readFileSync(path.join('out', file)));
		}
	});
	
	get('**', 'text/html', load('out/main.html'));
}