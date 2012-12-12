function cookieStore()
{
	function saveObjectCookie(obj){
		var c = 'eJSON='+escape(JSON.stringify(obj))+';';
		var expire = new Date();
		expire.setTime(expire.getTime()+(1000*60*60*24*365)); //store one year
		c+='expires='+expire.toGMTString()+';';
		document.cookie=c;
	}
	
	function loadObjectCookie(){
		var cookie = document.cookie.split(';')
		if(cookie){
			var j = function(cookie){
				for(i in cookie)
				{ 
					var a = cookie[i].match(/eJSON=([^;]*)/);
					if(a) return unescape(a[1]);
				}}(cookie);
				if(j)return JSON.parse(j);
		}
		return new Object;
	}
	
	this.setItem = function(key,value)
	{
		var save = loadObjectCookie();
		save[key]=value;
		saveObjectCookie(save);
	}
	this.getItem = function(key)
	{
		var save = loadObjectCookie();
		return save[key];
	}
	this.removeItem = function(key)
	{
		var save = loadObjectCookie();
		delete save.key;
		saveObjectCookie(save);
	}
}