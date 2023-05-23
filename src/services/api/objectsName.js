let objects = {
    async getObjects(id){
        
        let res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+id);
        if(!res) {
            throw new Error("Something went wrong!");
        }
        return res.json();
    }
}

export default objects;