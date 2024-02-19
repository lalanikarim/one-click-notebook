import { Router } from 'itty-router';

// Create a new router
const router = Router();

/*
Our index route, a simple hello world.
*/
/*router.get('/', () => {
	return new Response('Hello, world! This is the root page of your Worker template.');
});*/

/*
This route demonstrates path parameters, allowing you to extract fragments from the request
URL.

Try visit /example/hello and see the response.
*/
/**
 * @param {Request} request
 */
const get_notebook_url = (request) => {
	// Decode text like "Hello%20world" into "Hello world"
	let from = new URL(request.url)
	let search = from.searchParams
	let on = search.get('on')
	let url = search.get('url')
	let debug = search.get('debug')
	let host = ''
	let pathname = ''
	let repo = ''
	let path = ''
	let link = ''
	try{
		let nb = new URL(url)
		host = nb.host
		if (host != 'github.com') {
			debug = true
		}
		pathname = nb.pathname
		repo = pathname.split('/',3).join('/')
		path = pathname.substring(repo.length)

		if(on == 'colab') {
			link = 'https://colab.research.google.com/github' + pathname
		}
		if(on == 'paperspace'){
			link = 'https://console.paperspace.com/github' + repo + '?file=' + path
		}
	}
	catch {
	}

	if (debug) {
	// Return the HTML with the string to the client
		return new Response(`<p>Referrer: ${url}</p>
			<p>Host: ${host}</p>
			<p>Pathname: ${pathname}</p>
			<p>Repo: ${repo}</p>
			<p>Path: ${path}</p>
			<p>On: ${on}</p>
			<p><a href='${link}'>${on}</a></p>`, {
			headers: {
				'Content-Type': 'text/html',
			},
		})
	} else {
		return new Response(null, {
			headers: { Location: link },
			status: 301
		})
	}
}
router.get('/', get_notebook_url)

/*
This is the last route we define, it will match anything that hasn't hit a route we've defined
above, therefore it's useful as a 404 (and avoids us hitting worker exceptions, so make sure to include it!).

Visit any page that doesn't exist (e.g. /foobar) to see it in action.
*/
router.all('*', () => new Response('404, not found!', { status: 404 }));

export default {
	fetch: router.handle,
};
