<template>
    <div class="footer">
        <button @click="$emit('action','move')" class="button">Переместить</button>
        <button @click="$emit('action','copy')" class="button">Скопировать</button>
        <button @click="$emit('action','remove')" class="button">Удалить</button>
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
    font-family: 'Gilroy';
    font-size: 120%;
}
</style>