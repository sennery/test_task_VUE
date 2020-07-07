<template>
    <div class='container'>
        <div class = 'wrapper'>
            <Window v-on:curChanged = "changeCur" 
                    v-bind:dirData= "dirData1" 
                    v-bind:current = "current" 
                    v-on:updateData = "updateData1"/>
            <Window v-on:curChanged = "changeCur" 
                    v-bind:dirData= "dirData2"
                    v-bind:current = "current" 
                    v-on:updateData = "updateData2"/>
        </div>
        <Footer v-on:action = "action"/>
    </div>
</template>

<script>
import Window from './Window'
import Footer from './Footer'

export default {
    name: 'Container',
    data() {
        return {
            dirData1: {},
            dirData2: {},
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
        updateData1(path,fileName,disk){
            this.updateData(path,fileName,disk, 1);
        },
        updateData2(path,fileName,disk){
            this.updateData(path,fileName,disk, 2);
        },
        updateData(path, fileName, disk, sheet) {
            this.sendPost((disk) ? fileName : path + '/' + fileName, 'open').then( (value) => {
                if (sheet == 1) this.dirData1 = value;
                else this.dirData2 = value;
            });
        },
        action(type) {
            let request;
            let dir;
            if(this.dirData1.fileList.some((e) => {
                dir = e == this.current;
                return dir;
            })) request = {
                    obj : this.dirData1.path + '/' + this.current.fileName,
                    pathTo: this.dirData2.path + '/' + this.current.fileName
                };
            else request = {
                    obj : this.dirData2.path + '/' + this.current.fileName,
                    pathTo: this.dirData1.path + '/' + this.current.fileName
                };

            this.sendPost(JSON.stringify(request), type).then( (value) => {                
                if(dir){
                    this.dirData1 = value.dir1;
                    this.dirData2 = value.dir2;
                }else{
                    this.dirData2 = value.dir1;
                    this.dirData1 = value.dir2;
                }
            });
        },
        async sendPost(req, type) {
            let response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    "Content-type": "text/plain"
                },
                body: req 
            });
            let result = await response.json();
            return result;
        }
    },
    async mounted() {
        this.sendPost('C:/', 'open').then( (value) => {
            this.dirData1 = this.dirData2 = value;
        });
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