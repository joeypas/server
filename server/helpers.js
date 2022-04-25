const fs = require('fs');
const fsPromises = fs.promises;
const file = './public/data.json';


module.exports.add = (content) => {
    const date = new Date();
    fs.readFile(file, 'utf-8', (err, data) =>{
        if (err){
            console.log(err);
        } else {
            let line = "";
            var pkg = JSON.parse(data.toString());
	    if (content.sub == ''){
		line = '1';
	    } else {
		line = content.sub;
	    }
            pkg.table.push({"hour": date.getHours(), "line": line});
            const load = JSON.stringify(pkg);
            fs.writeFile(file, load, (err) => {
                if (err) {
                    console.log("Fail");
                    throw err;
                    
                } 
            });
        }
    });
} 

module.exports.getLine = async () => {
    const date = new Date();
    let data;
    try { 
        data = await fsPromises.readFile(file, 'utf-8');
    }catch (err){
        console.log(err);
    }
    const pkg = JSON.parse(data.toString());
    const line = pkg.table.filter(line => line.hour === date.getHours());
    let avg = 0;
    let count = 0;
    line.forEach((x) => {
        avg += parseInt(x.line);
        count ++;
    })
    let average = 0;
    if (avg != 0){
        average = avg/count; 
    } else {
        average = 0; 
    }
    return average.toString()
}

module.exports.delete = async () => {
    let data;
    try { 
        data = await fsPromises.readFile(file, 'utf-8');
    } catch (err){
        console.log(err);
    }
    var pkg = JSON.parse(data.toString());
    pkg.table.splice(0, pkg.table.length);
    const load = JSON.stringify(pkg);
    fs.writeFile(file, load, (err) => {
        if (err) {
            console.log("Fail");
            throw err;
        } 
    });
}
