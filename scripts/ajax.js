/**
 * 
 * postData('http://localhost:8080/Chess/rest/helloworld/')
 */

function getData(url)
{
    var xobj = new XMLHttpRequest();
    
    xobj.open("GET", url, true);
    xobj.onreadystatechange = function()
    {
        if(xobj.readyState === 4 && xobj.status === 200)
        {
            alert(xobj.responseText);
        }
    };
    xobj.send(null);
}

function postData(url)
{
    var xobj = new XMLHttpRequest();
    
    xobj.open("POST", url, true);
    xobj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xobj.onreadystatechange = function()
    {
        if(xobj.readyState === 4 && xobj.status === 200)
        {
            callback(xobj.responseText);
        }
    };
    xobj.send('hey there');
}

function callback(txt) {
	
	document.getElementById("chessfooter").innerHTML = txt;
}