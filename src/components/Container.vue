<template>
    <div class="container">
        <div class="wrapper">
            <Window @curChanged="changeCur"
                    @updateData="updatePanels"
                    :current="current" 
                    :path="panels[0]"
                    :number="0"/>
            <Window @curChanged="changeCur" 
                    @updateData="updatePanels"
                    :current="current"
                    :path="panels[1]"
                    :number="1"/>
        </div>
        <Footer @remove="remove"
                @move="move"
                @copy="copy"/>
    </div>
</template>

<script>
import Window from './Window'
import Footer from './Footer'
import {rest} from '../assets/Rest.js'

export default {
    name: 'Container',
    data() {
        return {
            panels: ['C:/', 'C:/'],
            refreshOnChange: false,
            current: null
        }
    },
    components: {
        Window,
        Footer
    },
    methods: {
        changeCur(current, path) {
            this.current = current;      
        },
        updatePanels(path, n) {
            this.$set(this.panels, n, path);  
        },
        async remove() {
            await rest.removeFile(this.current.path + '/' + this.current.fileName);
            this.current = ''; 
        },
        async move() {
            await rest.moveFile(this.current.path + '/' + this.current.fileName, 
                (this.current.path == this.panels[0]) ? this.panels[1] + '/' + this.current.fileName : this.panels[0] + '/' + this.current.fileName);
            this.current = '';
        },
        async copy() {
            await rest.copyFile(this.current.path + '/' + this.current.fileName, 
                (this.current.path == this.panels[0]) ? this.panels[1] + '/' + this.current.fileName : this.panels[0] + '/' + this.current.fileName);
            this.current = '';
        }
    }
}
</script>

<style>
.container{
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: rgb(96, 22, 162);
    font-family: 'Gilroy';
}

.wrapper{
    display: flex;
    width: 100vw;
    height: 85vh;
}

@font-face {
    font-family: 'Gilroy'; 
    src: url(/fonts/Gilroy-Light.otf);
    font-weight: light;
}

@font-face {
    font-family: 'Gilroy'; 
    src: url(/fonts/Gilroy-ExtraBold.otf);
    font-weight: bold;
}
</style>