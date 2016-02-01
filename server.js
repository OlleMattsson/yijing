var server=require('node-http-server');

console.log(server);

server.deploy({
	port:8000,
	root:'/Users/olmen/dev/yijing/dist',
	//root:'/Users/olmen/dev/yijing/src',
	verbose:true
});