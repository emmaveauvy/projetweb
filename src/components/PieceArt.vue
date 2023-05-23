<template>
    <div class="oeuvre">
       
        <img :src=img />
        <h2 class="name">{{ name }}</h2>
        <p class="artist">{{ artist }}</p>
        <p class="year">{{ year }}</p>

    </div>
</template>
    
<script>



export default {
    name: 'PieceArt',
    data() {
        return {
            //objectsID: [],
            //name: "toto",
        }

    },
    methods: {
      
    },

    props: {
        name: {required: true},
        year: {required: true},
        img: {required: true},
        artist: {required: true},
       
    }
   
}
</script>
<style>
    p {
    text-align: center;
    font-size: 18px;
    }
</style>