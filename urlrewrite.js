

own3d = function(){ 
	this.knows = function(url){ return url.match(/http:\/\/.{0,7}.own3d.tv/);};
	this.geturl = function(url){
		if(!this.knows(url)) return false;
		url = url.match(/http:\/\/.{0,7}.own3d.tv\/.*/)[0];
		var repla = new Array(
			function(){this.reg =/own3d.tv\/.*live/;this.rep="own3d.tv/livestream"},
			function(){this.reg =/own3d.tv\/.*watch/;this.rep="own3d.tv/stream"},
			function(){this.reg =/own3d.tv\/.*video\/([^\/]*).*/;this.rep="own3d.tv/stream/$1"}
		);
		var i = 0;
		while(i < repla.length)
		{
			var c= new repla[i];
			if(url.match(c.reg)){
				url=url.replace(c.reg,c.rep)
				return url;
			}else 
				i++;
		}
		return false;
	};
};


yt = function(){ 
	this.knows = function(url){ return url.match(/http:\/\/.{0,7}.youtube.com/);};
	this.geturl = function(url){
		if(!this.knows(url)) return false;
		returl = url.match(/http:\/\/.{0,7}.youtube.com\/.*/)[0];
		var repla = new Array(
			function(){this.reg =/youtube.com\/user\/.*#p.*\/([^&?]*).*/;this.rep="youtube.com/v/$1"},
			function(){this.reg =/youtube.com\/watch\?v=([^&?]*).*/;this.rep="youtube.com/v/$1"},
			function(){this.reg =/youtube.com\/watch_popup\?v=([^&?]*).*/;this.rep="youtube.com/v/$1"}
		);
		var i = 0;
		while(i < repla.length)
		{
			var c= new repla[i];
			if(returl.match(c.reg)){
				returl=returl.replace(c.reg,c.rep)
				return returl;
			}else 
				i++;
		}
		return false;
	};
};


// http://www.ustream.tv/flash/live/<player_version>/<cid>
// http://www.ustream.tv/flash/video/<player_version>/<vid>
ustream =  function(){ 
	this.knows = function(url){ return url.match(/http:\/\/.{0,7}.ustream.tv\/recorded\//);};
	this.geturl = function(url){
		if(!this.knows(url)) return false;
		url = url.match(/http:\/\/.{0,7}.ustream.tv\/recorded\/.*/)[0];
		var repla = new Array(
			function(){this.reg =/ustream.tv\/recorded\/(\d*).*/;this.rep="ustream.tv/flash/video/1/$1"}
		);
		var i = 0;
		while(i < repla.length)
		{
			var c= new repla[i];
			if(url.match(c.reg)){
				url=url.replace(c.reg,c.rep)
				return url;
			}else 
				i++;
		}
		return false;
	};
};

ustreamembed = function(){
	this.knows = function(url){ return url.match(/<embed[^>]*ustream.tv/m);};
	this.geturl = function(url){
		if(!this.knows(url)) return false;
		url = url.match(/<embed[^>]*ustream.tv[^>]*/m)[0];
		var repla = new Array(
			function(){this.reg =/<embed.*cid=\d\/(\d*)[^>]*/m;this.rep="http://www.ustream.tv/flash/live/1/$1"},
			function(){this.reg =/<embed.*vid=\d\/(\d*)[^>]*/m;this.rep="http://www.ustream.tv/flash/video/1/$1"}
		);
		var i = 0;
		while(i < repla.length)
		{
			var c= new repla[i];
			if(url.match(c.reg)){
				url=url.replace(c.reg,c.rep)
				return url;
			}else 
				i++;
		}
		return false;
	};
};


e = function(){
	this.knows = function(url){ return url.match(/<embed/);};
	this.geturl = function(url){
		if(!this.knows(url)) return false;
		var repla = new Array(
			function(){this.reg =/<embed.*src=\"([^"]*).*/;this.rep="$1"}
		);
		var i = 0;
		while(i < repla.length)
		{
			var c= new repla[i];
			if(url.match(c.reg)){
				url=url.replace(c.reg,c.rep)
				return url;
			}else 
				i++;
		}
		return false;
	};
};



var urlrewriter= new Array(new yt,new own3d,new ustream, new ustreamembed, new e);
function geturl(url){
	for(i in urlrewriter)
	{
		if( urlrewriter[i].knows(url) )
			return urlrewriter[i].geturl(url)
	}
	return url;
};
