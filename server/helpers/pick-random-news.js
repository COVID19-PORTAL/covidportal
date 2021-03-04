function random(news){
    let result = [];
    let {articles} = news;
    for(let i = 0; i < 4; i++){
        let index = Math.floor(Math.random()*articles.length);
        result.push(articles[index]);
        articles.splice(index,1);
    }
    return result;
}

module.exports = random