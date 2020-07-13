<template>
    <div class="window">
        <Header
            :currDir="dirData.path"
            :availDisks="dirData.disksList"
            @backDir="updatePath('..')"
            @goOtherDisk="updatePath"
        />
        <hr class="line">
        <div class="list">
            <Element v-for="file in dirData.fileList"  
                :class="{selected: select(file)}" 
                :key="file.fileName"
                :file="file" 
                @openDir="updatePath"
                @click.native="changeCur(file)" />
        </div>
    </div>
</template>

<script>
import Header from './Header'
import Element from './Element'
import {rest} from '../assets/Rest.js'

export default {
    props : ['current', 'path', 'number'],
    name: 'Window',
    data() {
        return{
            dirData: {},
        }
    },
    components: {
        Header,
        Element
    },
    methods: {
        changeCur(file) {
            this.$emit('curChanged', {...file, path: this.dirData.path, number: this.number});            
        },
        updatePath(pathTo, disk) {
            this.updateData((disk) ? pathTo : this.dirData.path + '/' + pathTo);
        },
        async updateData(pathTo) {
            this.dirData = await rest.getContent(pathTo);
            this.$emit('updateData', this.dirData.path, this.number);
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
    watch: {
        current: async function() {
            this.dirData = await rest.getContent(this.dirData.path);
        }
    },
    async mounted() {
        this.dirData = await rest.getContent(this.path);
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