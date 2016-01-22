module.exports = {
	entry: "./src/js/app.js",
    output: {
    	path: __dirname + "/public",
        filename: "app.js"
    },
    resolve: {
		extensions: ['', '.js', '.jsx'],
	},
    module: {
	    loaders: [
	    	{
	    		test: /\.scss$/,
	    		loaders: ["style", "css", "sass"]
	    	},
	    	{
	    		test: /\.js$/,
	    		exclude: /(node_modules|bower_components)/,
			    loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
	    	}
	    ]
	  }
};