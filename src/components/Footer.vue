<template>
    <div class="footer">
        <button v-on:click = "$emit('move')" class='button'>Переместить</button>
        <button v-on:click = "$emit('copy')" class='button'>Скопировать</button>
        <button v-on:click = "$emit('delete')" class='button'>Удалить</button>
    </div>
</template>

<script>
export default {
    name: 'Footer'    
}
</script>

<style>
.footer {
    display: flex;
    height: 15vh;
    width: 100vw;
}
.button {
    width: 15vw;
    height: 5vh;
    margin: auto;
    border-radius: 5px;
    background-color:white;
    cursor: pointer;
}
</style>