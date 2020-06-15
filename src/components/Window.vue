<template>
    <div class="window">
        <Header
            v-bind:currDir='dirData.path'
            v-bind:availDisks='dirData.disksList'
            v-on:backDir ='backDir'
            v-on:goOtherDisk = "goOtherDisk"
        />
        <hr class="line">
        <div class = 'list'>
            <Element v-for="file in dirData.fileList"  
                v-bind:class = "{selected: current === file}" 
                v-on:click.native = "changeCur(file)" 
                v-bind:key = "file.fileName"
                v-bind:file = "file" 
                v-on:openDir = "openDir"/>
        </div>
    </div>
</template>

<script>
import Header from './Header'
import Element from './Element'

export default {
    props : ['dirData', 'current'],
    data() {
        return{}
    },
    methods: {
        goOtherDisk(disk) {
            this.sendPost(disk);
        },
        backDir() {
            this.sendPost(this.dirData.path + '/..');
        },
        openDir(file) {           
            if(file.type != 'directory') return
            this.sendPost(this.dirData.path + '/' + file.fileName);    
        },
        async sendPost(path) {
            let response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    "Content-type": "text/plain"
                },
                body: path 
            });
            let result = await response.json();
            this.updateData(result);
        },
        changeCur(file) {
            this.$emit('curChanged', file);
        },
        updateData(result) {
            this.$emit('updateData', result);
        }
    },
    name: 'Window',
    components: {
        Header,
        Element
    }
}
</script>

<style>
.window{
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 0;
    width: 45vw;
    height: 80vh;
    background-color: white;
    border-radius: 5px;
}
.line{
    width: 90%;
}
.list {
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: auto;
}
</style>