<template>
  <div class="recherche">
    <!--Recherche-->
    <input type="text" v-model="search" placeholder="Chercher une oeuvre ou un.e artiste">
    <button v-if="search" @click="cleanSearch">X</button>
  </div>

  <div class="boutons">
     <!--Filtrage et tri-->
    <button @click="filterByDate" :class="{ active: isFiltered }">Oeuvre après 1750</button>
    <button :class="{ active: sortBy === 'name' }" @click="orderByTitle">Trier par titre</button>
    <button :class="{ active: sortBy === 'artist' }" @click="orderByArtist">Trier par artiste</button>
  </div>

  <div class="conteneur">
    <!--AFfichage de la gallerie-->
    <div
      :class="['gallery', isMatch(object.title) || isMatch(object.artistDisplayName) ? '' : 'invisible']"
      v-for="object in displayedObjects"
      :key="object"
    >
      <PieceArt :img="object.primaryImageSmall" :artist="object.artistDisplayName" :year="object.objectDate" :name="object.title" />
    </div>
  </div>
</template>

<script>
import objectsID from '../services/api/objectsID.js';
import objects from '../services/api/objectsName.js';

import PieceArt from './PieceArt.vue';

export default {
  name: 'GalleryArt',
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
      sortBy: 'name',
      isFiltered: false,
    };
  },
  created: async function () {
    await this.getIDObjts();
    await this.getObjts();
  },
  computed: {
     /*
pré tri sur objects pour les sortir du tableau
utiliser données calculées : définir un champs qui est une fonction
boucle qui parcourt this objects avec la condition du if, 
  */    
    triIMG() {
      let objetsTries = [];
      if (this.objects.length != 0) {
        for (let i = 0; i < this.objects.length; i++) {
          if (this.objects[i].primaryImageSmall !== '') {
            objetsTries.push(this.objects[i]);
          }
        }
        return objetsTries;
      } else {
        return 4;
      }
    },

    displayedObjects() {
      if (this.isFiltered) {
        // Filtrer les objets via date
        return this.objects.filter((object) => {
          if (object.objectDate) {
            const year = parseInt(object.objectDate);
            return year > 1750;
          }
          return false;
        });
      } else {
        return this.objects;
      }
    },
  },
  methods: {
    //fetch IDs
    async getIDObjts() {
      const request = await objectsID.getIDObjects();
      this.ids = request['objectIDs'];
    },
    //fetch objets
    async getObjts() {
      for (let i = 0; i < this.ids.length; i++) {
        this.objects.push(await objects.getObjects(this.ids[i]));
      }
    },
    cleanSearch: function () {
      this.search = '';
    },
    //fonction de la recherche
    isMatch(name) {
      return name.toLowerCase().includes(this.search.toLowerCase());
    },
    orderByTitle() {
      this.objects.sort((a, b) => {
        if (a.title && b.title) {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
      this.sortBy = 'name';
    },
    orderByArtist() {
      this.objects.sort((a, b) => {
        if (a.artistDisplayName && b.artistDisplayName) {
          return a.artistDisplayName.localeCompare(b.artistDisplayName);
        }
        return 0;
      });
      this.sortBy = 'artist';
    },
    //activation et desactivation du filtre
    filterByDate() {
      this.isFiltered = !this.isFiltered;
    },
  },
};
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