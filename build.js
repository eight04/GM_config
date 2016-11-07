var less = require("less"),
	fs = require("fs");
	
Promise.all(
	["src/style.less", "src/style-dialog.less"].map(
		fn => less.render(fs.readFileSync(fn, "utf8"), {
			filename: fn,
			compress: true
		})
	)
).then(values => {
	var [css, configcss] = values.map(
		output => output.css.replace(/'|"/g, "\\$&")
	);
	
	console.log(
		fs.readFileSync("src/GM_config.js", "utf8")
			.replace("@@CSS", css)
			.replace("@@CONFIGCSS", configcss)
	);
});
