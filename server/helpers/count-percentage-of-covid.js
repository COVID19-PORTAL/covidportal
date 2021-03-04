function count(covids, populations){
    let percent = 0;
    for ( let i = 0; i < populations.length; i++){
        for ( let j = 0; j < covids.length; j++){
            if(populations[i].province.toLowerCase() === covids[j].provinsi.toLowerCase()){
                percent = covids[j].kasus / populations[i].population * 100;
                covids[j].province = populations[i].province;
                covids[j].percent = percent;
            }
        }
    }
}

module.exports = count