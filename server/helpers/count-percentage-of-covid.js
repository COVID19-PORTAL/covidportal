function count(covids, populations){
    let percent = 0;
    let results = [];
    for ( let i = 0; i < populations.length; i++){
        let obj = {
            province: "",
            percent: 0,
        }
        for ( let j = 0; j < covids.length; j++){
            if(populations[i].province.toLowerCase() === covids[j].provinsi.toLowerCase()){
                percent = covids[j].kasus / populations[i].population * 100;
                obj.province = populations[i].province;
                obj.percent = percent;
                results.push(obj);
                break;
            }
        }
        if (obj.province.length === 0){
            obj.province = populations[i].province;
            results.push(obj);
        }
    }
    return results;
}

module.exports = count