const { default: axios } = require("axios");
const postToDev = require("../services/postToDev");
const postToHashnode = require("../services/postToHashnode");

function mediumURLparser(URL) {
    const arr = URL.split("/");
    const result = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${arr[3]}`
    return result;
}

exports.postFromMedium = async(req, res, next) => {
    try{
        const {url, dev, hash, dev_api, hash_api} = req.body;
        const link = mediumURLparser(url);
        const {data} = await axios.get(link);        
        const feed = data;

        const itemArr = feed.items;
        const article = itemArr.filter(item => item.link.split("?")[0] === url);
        let Devblog;
        let hashBlog;

        //TODO: Below empty array check not working
        if(!article){
            res.status(400).json({"Error": "Blog Not found"});
        }
        //TODO: Array is comming in article
        if(dev) {
            Devblog = await postToDev(article[0], dev_api, "medium");
            if(!Devblog){
                return res.status(400).json({"Error": "Unable to publish to Dev.to From Medium"});
            }
        }

        if(hash){
            hashBlog = await postToHashnode(article[0], hash_api, "medium");
            if(!hashBlog){
                return res.status(400).json({"Error": "Unable to publish to Hashnode from Medium"});
            }
        }
        if(hashBlog || Devblog){
            return res.status(201).json({"Message": "Blog Sucessfully Posted"});
        }
        return res.status(400).json({"Error": "None Encountred"});
    } catch(error){
        console.log(error);
        return error;
    }

}