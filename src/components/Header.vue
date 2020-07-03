<template>
    <div class = 'header'>
        <select class = "sel" v-model = 'selected' v-on:change = "$emit('goOtherDisk', selected, true)">
            <option v-for="disk in availDisks" v-bind:key="disk">{{disk}}</option>
        </select>
        <div class = 'header-elements text'>{{currDir}}</div>
        <button class = 'header-elements but' v-on:click = "$emit('backDir')">/</button>
    </div>
</template>

<script>
export default {
    props:['currDir','availDisks'],
    name: 'Header',
    data() {
        return {
            selected: null
        }
    }
}
</script>

<style>
.header{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    position: relative;
    top: 0;
}
.text{
    font-size: 1.2rem;
    text-align: center;
    font-weight: bold;
}
.but{
    width: 5%;
    border-radius: 5px;
    background-color:white;
    cursor: pointer;
}
.sel{
    border-radius: 5px;
    font-size: 1.05rem;
}
</style>