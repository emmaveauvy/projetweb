let objectsID = {
    async getIDObjects(){
        
        let res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=11');
        if(!res) {
            throw new Error("Something went wrong!");
        }
        return res.json();
    }
}




export default objectsID;
