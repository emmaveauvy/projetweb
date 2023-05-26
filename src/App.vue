<template>
 <header>
  <h1>European Paintings</h1>
 </header> 

    <GalleryArt/>
<footer>Emma Veauvy</footer>
</template>

<script>

import GalleryArt from './components/GalleryArt.vue';


export default {
  name: 'App',
  components: {
    
    GalleryArt
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
