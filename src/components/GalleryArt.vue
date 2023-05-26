
<template>
  <div class="recherche">
    <input type="text" v-model="search" placeholder="Chercher une oeuvre ou un.e artiste">
    <button v-if="search" @click="cleanSearch">X</button>
  </div>

  <div class="boutons">
    <button @click="toggleFilter">Oeuvre après 1750</button>
    <button :class="{ active: sortBy === 'year' }" @click="orderByDate">Trier par date</button>
    <button :class="{ active: sortBy === 'name' }" @click="orderByTitle">Trier par titre</button>
    <button :class="{ active: sortBy === 'artist' }" @click="orderByArtist">Trier par artiste</button>
  </div>

  <div class="conteneur">
    <div class="gallery" v-for="object in displayedObjects" :key="object">
      <PieceArt :img="object.primaryImageSmall" :artist="object.artistDisplayName" :year="object.objectDate" :name="object.title" />
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
      search: '',
      sortBy: 'date',
      filterEnabled: false,
    };
  },
  created: async function () {
    await this.getIDObjts();
    await this.getObjts();
  },
  props: {},
  computed: {
    displayedObjects() {
      let filteredObjects = this.objects;
      if (this.filterEnabled) {
        filteredObjects = filteredObjects.filter(object => object.objectDate > 1750);
      }
      return filteredObjects
        .sort((a, b) => {
          if (this.sortBy === 'year') {
            return this.compareByYear(a, b);
          } else if (this.sortBy === 'name') {
            return this.compareByTitle(a, b);
          } else if (this.sortBy === 'artist') {
            return this.compareByArtist(a, b);
          }
          return 0;
        })
        .slice(0, 50);
    },
  },
  methods: {
    async getIDObjts() {
      const request = await objectsID.getIDObjects();
      this.objectsID = request["objectIDs"];
    },
    async getObjts() {
      for (let i = 0; i < this.objectsID.length; i++) {
        const object = await objects.getObjects(this.objectsID[i]);
        this.objects.push(object);
      }
    },
    cleanSearch() {
      this.search = "";
    },
    compareByYear(a, b) {
      if (a.objectDate && b.objectDate) {
        return a.objectDate.localeCompare(b.objectDate);
      }
      return 0;
    },
    compareByTitle(a, b) {
      if (a.title && b.title) {
        return a.title.localeCompare(b.title);
      }
      return 0;
    },
    compareByArtist(a, b) {
      if (a.artistDisplayName && b.artistDisplayName) {
        return a.artistDisplayName.localeCompare(b.artistDisplayName);
      }
      return 0;
    },
    orderByDate() {
      this.sortBy = 'year';
    },
    orderByTitle() {
      this.sortBy = 'name';
    },
    orderByArtist() {
      this.sortBy = 'artist';
    },
    toggleFilter() {
      this.filterEnabled = !this.filterEnabled;
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