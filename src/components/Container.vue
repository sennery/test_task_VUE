<template>
    <div class="container">
        <div class="wrapper">
            <Window v-for="(item,index) in panels"
                    @curChanged="changeCur"
                    @updateData="updatePanels"
                    :key="index"
                    :current="current" 
                    :path="panels[index]"
                    :number="index"
                    @showError="showError"/>
        </div>
        <Footer @action="action"/>
        <transition name="modal">                
            <Modal v-if="showModal" @close="showModal = false">
                {{ errMessage }}
            </Modal>        
        </transition>
    </div>
</template>

<script>
import Window from './Window'
import Footer from './Footer'
import Modal from './Modal.vue'
import {rest} from '../assets/Rest.js'


export default {
    name: 'Container',
    data() {
        return {
            panels: ['C:/', 'C:/'],
            refreshOnChange: false,
            current: null,
            showModal: false,
            errMessage: ''
        }
    },
    components: {
        Window,
        Footer,
        Modal
    },
    methods: {
        showError(message) {
            this.errMessage = message;
            this.showModal = true;
        },
        changeCur(current, path) {
            this.current = current;      
        },
        updatePanels(path, n) {
            this.$set(this.panels, n, path);  
        },
        action(name) {
            this[name]().catch( err => this.showError(err.message) );
        },
        async remove() {
            await rest.removeFile(this.current.path + '/' + this.current.fileName);
            this.current = null;        
        },
        async move() {
            await rest.moveFile(this.current.path + '/' + this.current.fileName, 
                (this.current.path == this.panels[0]) ? this.panels[1] + '/' + this.current.fileName : this.panels[0] + '/' + this.current.fileName);
            this.current = null;        
        },
        async copy() {
             await rest.copyFile(this.current.path + '/' + this.current.fileName, 
                (this.current.path == this.panels[0]) ? this.panels[1] + '/' + this.current.fileName : this.panels[0] + '/' + this.current.fileName);
            this.current = null;            
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