let departements = {
    async getDepartements(){
        
        let res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
        if(!res) {
            throw new Error("Something went wrong!");
        }
        return res.json();
    }
}

export default departements;