<template>
    <div class="window">
        <Header
            v-bind:currDir= "dirData.path"
            v-bind:availDisks= "dirData.disksList"
            v-on:backDir = "updateData('..')"
            v-on:goOtherDisk = "updateData"
        />
        <hr class="line">
        <div class = 'list'>
            <Element v-for="file in dirData.fileList"  
                v-bind:class = "{selected: select(file)}" 
                v-on:click.native = "changeCur(file)" 
                v-bind:key = "file.fileName"
                v-bind:file = "file" 
                v-on:openDir = "updateData"/>
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
        changeDisk(disk) {
            this.$emit('updateData', this.dirData.path, disk)    
        },
        changeCur(file) {
            this.$emit('curChanged', {...file, path: this.dirData.path});
        },
        updateData(fileName, disk) {
            if(!disk) disk = false;
            this.$emit('updateData', this.dirData.path, fileName, disk);
        },
        select(file) {
            try {
                return (this.current.fileName === file.fileName && this.current.path === this.dirData.path);
            }
            catch (e) {
                console.log(e);
                return false;
            }
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
    margin: 0 auto;
}
.list {
    display: flex;
    flex-direction: column;
    height: 90%;
    overflow-y: auto;
}
</style>