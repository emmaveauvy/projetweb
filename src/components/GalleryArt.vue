
<template>
  <div class="recherche" >
    <input type="text" v-model="search" placeholder ="Chercher une oeuvre ou un.e artiste" >
    <button v-if="search" @click="cleanSearch">X</button>
  </div>

  <div class="boutons" >
    <button :class="{ active: sortBy === 'year' }" @click="orderByDate">Trier par date</button>
    <button :class="{ active: sortBy === 'name' }" @click="orderByTitle">Trier par titre</button>
    <button :class="{ active: sortBy === 'artist' }" @click="orderByArtist">Trier par artiste</button>

  </div>


  <div class="conteneur" >
    <div :class="['gallery', isMatch(object.title) ||  isMatch(object.artistDisplayName) ? '' : 'invisible']" v-for="object in triIMG " :key="object" >

    <PieceArt :img="object.primaryImageSmall" :artist="object.artistDisplayName" :year="object.objectDate" :name="object.title"  />

    </div>
</div>
</template>
    


<script>
import objectsID from '../services/api/objectsID.js';
import objects from '../services/api/objectsName.js';



import PieceArt from './PieceArt.vue';



export default {
    name: "GalleryArt",
    components: { PieceArt },
    data() {
        return {
            objectsID: [],
            objects: [],
            pieceArtName: [],
            author: [],
            year: [],
            img: [],
            ids: [],
            search: '', 
            sortBy: 'date'
        }

    },
     created: async function(){
         await this.getIDObjts();
         await this.getObjts();
    },
    
    props:{
       
    },
    computed: {
        /*
pré tri sur objects pour les sortir du tableau
utiliser données calculées : définir un champs qui est une fonction
boucle qui parcourt this objects avec la condition du if, 
  */    

        triIMG(){
           let objetsTries =[];
            if (this.objects.length != 0){
                for( let i=0; i<this.objects.length; i++){
                    if (this.objects[i].primaryImageSmall !== ''){
                        objetsTries.push(this.objects[i]);
                        //console.log(objetsTries);

                    }
                }
                return objetsTries;
                
            }else{
               
                return 4;
                
            }
           
        }
    },
    methods: {
        async getIDObjts () {
            const request = await objectsID.getIDObjects();
            this.ids = request["objectIDs"];

        },
        async getObjts  (){
            // pour tous les id qu'il y a dans le tableau id 
            // remplir le tableau tabs avec le tableau correspondant à l'id
           
           
            for (let i =0; i<this.ids.length; i++){
                
                this.objects.push(await objects.getObjects(this.ids[i]));

            }
           
        },
        cleanSearch: function() {
            this.search = ""
        },
        isMatch(name) {
            return name.toLowerCase().includes(this.search.toLowerCase())
        },

        orderByDate() {
            this.objects.sort((a, b) => a.year - b.year);
            this.sortBy = 'year';
        },
        orderByTitle() {
            this.objects.sort((a, b) => a.name - b.name);
            this.sortBy = 'name';
        },

        orderByArtist() {
            this.objects.sort((a, b) => a.artist - b.artist);
            this.sortBy = 'artist';
        },


    }
}

</script>
<style>

.recherche{
    margin-bottom: 5%;
}

input{
    width:30%
}
.conteneur {
    display: flex;
    flex-wrap: wrap;
}

.gallery{
    width: 25%;
}
.gallery.invisible {
    display: none;
}

.oeuvre{
   
   display: block
}
.gallery img{
    width: 80%;
}
    p {
    text-align: center;
    font-size: 18px;
    }

    #titreGallery{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .disappear{
        width:0%;
    }

</style>