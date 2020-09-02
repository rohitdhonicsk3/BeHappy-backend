var fs=require('fs');
var data=fs.readFileSync('data.json');
var elements=JSON.parse(data);
const express = require("express");
const app = express();
const cors=require('cors');

//app.listen(process.env.PORT, () => console.log("Server Start at 5000 Port"));
app.listen(process.env.PORT, () => console.log("Server Start at 5000 Port"));
app.use(express.static('public'));
app.use(cors());
app.get('/data',alldata);
function alldata(request,response)
{
    response.send(elements);
}
app.get('/:city',cityData);
function cityData(request,response)
{
	var city=request.params.city;
	city=city.charAt(0).toUpperCase()+city.slice(1).toLowerCase();
	console.log(city);
	if(elements[city])
    {
    	
		var reply=elements[city];
		
	}
	else
	{
		var reply={
			status:"Not Found"
		}
	}
    //console.log(reply.boil);
	response.send(reply);
}
app.get('/:city/:budget',budgetData)
function budgetData(request,response)
{
	var city=request.params.city;
	var budget = request.params.budget;
	city=city.charAt(0).toUpperCase()+city.slice(1).toLowerCase();
	console.log(city+" "+budget);
	if(elements[city])
    {
    	var re="";

		var r=elements[city];
		console.log(Object.keys(r).length);
		var c=0;
		for(var i=0;i<Object.keys(r).length;i++)
		{
			//



			//console.log((r[String(i)][" Fees = "]));
			if((parseInt(r[String(i)][" Fees = "]))<=((parseInt(budget))) && r[String(i)][" Fees = "]!="")
			{
				console.log((r[String(i)][" Fees = "]));
				
				  re+="\""+String(c)+"\":"+JSON.stringify((r[String(i)]))+",";
				  c++;
			   
			}
			
			
		}
		re="{ \"data\" : {"+re.substring(0,re.length-1)+"}}";
		console.log((re));
		var reply=(re);
		
	}
	else
	{
		var reply={
			status:"Not Found"
		}
	}
	response.send(JSON.parse(reply));


}
/*app.get('/elements/:element/',searchElement);
function searchElement(request,response)
{
	var word=request.params.element;
	word=word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
	console.log(word);
	//console.log(elements[word]);
	if(elements[word])
	{
		var reply=elements[word];
		
	}
	else
	{
		var reply={
			status:"Not Found"
		}
	}
    console.log(reply.boil);
	response.send(reply);

}*/
