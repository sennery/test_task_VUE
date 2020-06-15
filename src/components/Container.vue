<template>
    <div class='container'>
        <div class = 'wrapper'>
            <Window v-on:curChanged = "changeCur" v-bind:dirData="dirData1" v-bind:current = "current" v-on:updateData = "update1Data"/>
            <Window v-on:curChanged = "changeCur" v-bind:dirData="dirData2" v-bind:current = "current" v-on:updateData = "update2Data"/>
        </div>
        <Footer v-on:delete = "remove" v-on:move = "move" v-on:copy = "copy"/>
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
        update1Data(data) {
            this.dirData1 = data;
        },
        update2Data(data) {
            this.dirData2 = data;
        },
        async remove() {
            let request;
            let dir;

            if(this.dirData1.fileList.some((e) => {
                dir = e == this.current;
                return dir;
            })) request = this.dirData1.path + '/' + this.current.fileName;
            else request = this.dirData2.path + '/' + this.current.fileName;

            let response = await fetch('http://localhost:3000/remove', {
                method: 'POST',
                headers: {
                    "Content-type": "text/plain"
                },
                body: request
            });

            let result = await response.json();

            if(dir)this.dirData1 = result;
            else this.dirData2 = result;
        },
        move() {
            this.moveOrCopy('move');
        },
        copy() {
            this.moveOrCopy('copy')
        },
        async moveOrCopy(type) {
            console.log(`http://localhost:3000/${type}`);
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

            let response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    "Content-type": "text/plain"
                },
                body: JSON.stringify(request)
            });

            let result = await response.json();
            if(dir){
                this.dirData1 = result.dir1;
                this.dirData2 = result.dir2;
            }else{
                this.dirData2 = result.dir1;
                this.dirData1 = result.dir2;
            }
        }
    },
    async mounted() {
        let response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    "Content-type": "text/plain"
                },
                body: 'C:/'
            });
        let result = await response.json();
        this.dirData1 = result;
        this.dirData2 = result;
    }
}
</script>

<style>
.container{
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background-color: rgb(10, 54, 90);
}

.wrapper{
    display: flex;
    width: 100vw;
    height: 85vh;
}
</style>