<template>
    <div class = 'elem_line' v-on:dblclick = "openDir">
        <span class = 'icon_name'>
            <img v-if="file.type == 'program'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAElElEQVR4nO2bX4hVRRzHP+fuLVDQRPMhcTM0tV76hxIoPphvPQhpWD6VVA8+9lJPBUFRlBAlQuGTfx50tV0LV0tB1hVNsUBdEcwgpSwL7c+aYJF7e/id8Z579twzc+4c9c69vw8c2DPnd+fMfHdmfnNm5geKoiiKoiiKoiiKoigl0wvsBEaBWpdco8AAML8M8a60QYXu1PV7rEHL7IgzGgRm+mQUGDOBPUjd+3wyMt22m8Qz9CJ1/8snE9OUDUuB48Aw8KhHeiik6++VQQRcSqQdbzE9JKwCVgpkVgEmJe6ntJjeVaT/A2uBf4CrwDMe6aFQahc2TADuyrAtmh4Ct0TAbqK0MbAf2Bj/HQG7u+g+l6qLEfA48Fv8dwWZkkzvknsvTBO+m8ZxLD2udeq9joGelDoPVDJQAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT1RAT3pVgG3MP4s4OCteFEnbipNAa4xXsAbwKyUrW4qZbAGmAh8hWyiR8BWRIuXUrYHfV/WaS1wIXAOqdOKRPqSOO0isBgR1bDS54WdIGAFWA2cpl6fnxl/4OlM4vlZ4EVK6KGhCzgH6YamHheBj4EnM2wfAT4AzifsDwGz814Q5T2k8XRqu/Mycq75XHxNQ7ztVOAX4I34/l9LPj3Ac8A7wAPA38jY+APwIDAXOTf9kUuhQmmBc4DrZIcqDCAiFmUSsLlJnv8hB66shCLgAPUutw34Fokw+ARpUc04DBzJeR4B7yKt8AQS9rE/ftdBHHpmCAIuQ8o4CtxnsR1EurFhGBGxCPcAv8bvXGUzDkHAIaSM2y12EeJdj5Xwzg3xO0/bDEMQ8ClkTBoDlltsq+R3aReWII5oDHjWZhyCgACvIeX8E/GSSfqRca6MmcQMxKPXgPddfhCKgBGwDynrutSzfYgDSE6KkxGoRSIzX6ceNOR0PDoUAUEOhteQOVwezSJQXSIzjcM66lqokAT8HinrQxa7nTRGoBaJzLw3tvvDtVAhCWha1bRE2hBwIGWXFYHaLDJzb+r3FeoOqwfcwxxCYCwjbQKyzudKurHUkC+clgmpBZrVFFsXNl8te5CW14u0NJe55HRa7MLtfD0dl9WMYzYnMh9xGOl8LmMPLDdO5GuTEPqK9AHqK8tmOFqYsukDvqFe17NIJNIO6tOYPuAx4KfYpopMfT5L5bUg8byThr+b87OsifQuYIRiXyBV4BTisZMUnkiHwDLcP+Uq5Pe6HuxCF/qUC4Eh3BwAyDLXiZznI8BJh3ycFxNCoMhy1i7gi8T9MI3rgf2MH/fSJJezbA4rGJotqH5KfpccIn89MALeI3tBdZgwtjqcyFvS/5zGrxNXJiP7xVl53gCegA5SEHgFuB/ZUPoO2Qcxm0qXgDeBTdg3larA88DbyEmFq8hm/I+Ih5+HePsPS69BGzKbupOpIfvB62m+rbkOuJCwPwY8fDsK2s5ESIsaoVFI28b6C/ivXnccC7Af7VhEZw1tpfMqItaXiTRz3O2tO1KiwChyvE1pQmkHLP8H/hs3f5Amjy4AAAAASUVORK5CYII="/>
            <img v-if="file.type == 'video'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABWklEQVRoge2YsUrDUBSG/6QptiIWlTo4WKiUiIgi2OCgdi2IQ59AnNxE8H18BSdRxKWDgy4iOKjFBixqQSkoYoTUxEGUau0gnJND8XxbuPDf83FyD5cLKIqiKP8Zo/WjUNoJpQr5C+Xtpa+6TclCKLA6LbRaAu3dkV7/pOs7oALS6BSSRgWkYRGYWplFT3+CI7oNFoGh8WE4GwsYcUZ/jAl62H4hKxmHXZrE9GoeiVSSaxv+MzCYS8PZXESmMAbDoG9HJIc4Fo8hW7QxszaH3nQfaXakUyiVGUB+ff6jGyZNNyIfo6ZlIlu0kVueIMnreJ3m4vXRg7t/ifrJDUleZAK+56NWrqJ26CJoBmS57ALBW4Dbo2u4BxU0PZ88n00gDEPcn9VR3buA13jh2oZHoFF5wNXuOZ7vnjjiv8EicLp1zBH7K3oblabrBfRdSBoVkEbfhRRFURRFkneQnXFwYEqs4gAAAABJRU5ErkJggg=="/>
            <img v-if="file.type == 'audio'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAEU0lEQVRoge2ZTWhcVRTHf2e+Mk1jmyaTQPNBoGgScDmloY2KShemC6mBtGIURMQPEqU7F+JCEMFlsFOqQlctKv1ARVtXoYsm0tLBRTe2WoVm0kKSiUkakzd5kzkuEttk3pt5X5MgNL/lueec+z9z351373mwxRaPNlKJJKp9YabH97EszwFJhE5gN1Cz6jIP3EW5CaQJM0zdyDURCkHnDlSAZp9pZTk/gMirQLPHqTOoniacT0n91YxfDb4K0HtPNxBZ/gTkdSDmd/JVloBTmNGPpOnylNdgzwXo5FOvgH4O1HmNLZ+YLKKD0jD6jZcw1wWoJqNMxU8Ab3oW540vSBjviaRNN86uCtC7yWqi8XNATyBp7rmIafRJU3rByTHk5KCajG6yeIBDROPfqz7puL8cC1h9bDZT/H8cZKp2yMmpbAE62d1PBZ75v99ow/y12k/oOzrRfbScQ8k9oHP76slFfwMSfmZey0SyE4BY1wI1xyaItBtewqcxox2l/mJLr0Au8ikVEL+WpavVTPe3MftBM8tjrl8fdUSWPi41aLsCmu1qoRC5TfCXFPBwBdYRUba9OMv2t6YINeSdUiwRliek7sqd4gH7FVgOD1Ih8SXJC4sXaske3uPGO0Ze37UbsBSgSggJ9QfV5xY1nP8IARBeU+0LF5ut0dMHukBbAisrQbhtyW9oM9lMsthoLWDlSLxh1J/7i52fjRNu8VNI+PliS8TGa6+PzO4JKVUH71P17DyLP+zkny89/dFZVsBagNAeQJ57Isq23hnih+a8RHUUG+x20G7fonwgcQ+XMlWLNrsCamxs/xceKzbY7QFfqCkY53dh/LyD/B9VK8kfzxHvma3UFLbYFTCPx9tWYSLCzPut5H+vWmc3b8Qxb8QDyLNwv9hg9wjd85JRTbEVvyGIWLRZC1BueclpnN+1OeJXuFlssFuB614yGpcs+2ojsWizFhBm2EvG/J+b9usDBYs2awF1I9eAsY2YXrYHasTdoX40XWy0FCBCAeWM26yRPTnXCrz4WlDO2LUi7c+y4XyKlY6ZI16OAvEeT8eGteQIFVJ2A7YFrPYqT7kS1Tvj6o4baTeI9864SWlF+UoSv4zbDZW+TcQKHwKOvUqJKrVDmbJFRNoNaocySFRdqC1CyZKPersTP4idPPAyyNeu5jEF40ItxqUd5G+vOUq8MEe8d8afeACVI9J45WypYcfWok52nwTe9jd7QJSUNI4MlnNxvpAmmgZAv6uYKNfITzREjzl5ORYgcnYZM9cPXKyILlfoj5iLR0QuO/ZbXLUEpCm9QMI4DJwMrM0JJUUi9pKbzjT4+cAx0X0U4TgV7toBk6gMlNuwdrhsyjxEGke+pcrsRPUEEODV+oAcynFihU6v4iHoR76p/c0UQoMI/UCrx/AxlNOECqlSLyk3VOgzKyGy+/eu9m2SQAeqzaz/zJpB5BZwHQrD1I+mK/GZdYstHnX+BRGVSuKeJKZeAAAAAElFTkSuQmCC"/>
            <img v-if="file.type == 'picture'" src="data:image/png;base64,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"/>
            <img v-if="file.type == 'document'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABmJLR0QA/wD/AP+gvaeTAAAA/klEQVRYhWNgGAWUAUZcEu4dx/9TyxJ2Vqazm4rNTahlHgMDA8SB1ADuHcf/x8y48M+/99RJctzBRFVf4QDl/pqMvFxspr69p86SqpcuDuThZGUoD9Bk5OdiMyTVkXRxIAMD+Y6kmwMZGMhzJF0dyMBAuiPp7kAGBtIcOSAOZGAg3pEs9HBMxgy8RSAjAwODES5JmjtwR7kFQTUenSdwyg1YFBMLRh1IKSA5DSbPusDw9P0PsiyTFuRgmJtmQJIekh1IqgWUgpEdxeREKToYjWJKwWguphSM7CgezcWDAYzmYkrBoI/iUQdSCkYdSCkYdSClAG85iK9DPQqGCgAAOqSYhnuGAIEAAAAASUVORK5CYII="/>
            <img v-if="file.type == 'file'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAAtUlEQVRoge3Ruw3CQBBF0Wu+ApqgCUKoyRmUAJk7oQ+IKcYiMDkElj0Db5HejUezc7TgXKiqb6C5td2XXr7Uu+UpumaSccvQ1osKOo7NvT1Hd0kAh+2UTRJCAljNK/ZJCAkA8hAyAOQgpACII+QAiCGKAMB4RDEAGIcoCgCfiL752S+Oeu/6eKbtKu4HhmaAOgPUGaDOAHUGqDNAnQHqDFBngDoD1BmgzgB1BqgzQN3fA5wL9gL4YDS54qLgLwAAAABJRU5ErkJggg=="/>
            <img v-if="file.type == 'directory'" alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCA0OCA0OCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij48cGF0aCBmaWxsPSIjRkZBMDAwIiBkPSJNNDAsMTJIMjJsLTQtNEg4Yy0yLjIsMC00LDEuOC00LDR2OGg0MHYtNEM0NCwxMy44LDQyLjIsMTIsNDAsMTJ6Ij48L3BhdGg+PHBhdGggZmlsbD0iI0ZGQ0EyOCIgZD0iTTQwLDEySDhjLTIuMiwwLTQsMS44LTQsNHYyMGMwLDIuMiwxLjgsNCw0LDRoMzJjMi4yLDAsNC0xLjgsNC00VjE2QzQ0LDEzLjgsNDIuMiwxMiw0MCwxMnoiPjwvcGF0aD48L3N2Zz4="/>
            <span class = 'file_name'>
                {{file.fileName}}
            </span>
        </span>
        <span class="dataWithTime">
            <span class = 'data'>
                {{findDate(file.changeTime)}}
            </span>
            <span class = 'size'>
                {{file.size}}
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props:['file'],
    name: 'Element',
    methods: {
        findDate(timestamp) {
            let date = new Date (timestamp);
            
            return ((date.getHours()<10)? ((date.getHours() == 0) ? '00' : '0' + date.getHours()): date.getHours()) + '.' 
                + ((date.getMinutes()<10)? ((date.getMinutes() == 0) ? '00' : '0' + date.getMinutes()): date.getMinutes()) + ' ' 
                + ((date.getDate()<10)?'0' + date.getDate(): date.getDate()) + '.' 
                + (((date.getMonth()+1)<10) ? '0' + (date.getMonth()+1) : (date.getMonth()+1)) + '.' 
                + date.getFullYear();
        },
        openDir(){
            if(this.file.type != 'directory') return

            this.$emit('openDir', this.file.fileName);
        }
    }
}
</script>

<style>
.elem_line {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 5%;
    margin: auto;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.1s ease;
}

.elem_line:hover{
    transform: translateX(-10px);
}

span {
    display: flex;
    justify-content: space-between;
    width: auto;
}

.icon_name {
    justify-content: left;
}

.dataWithTime {
    width: 35%;
}

img {
    height: 100%;
}

.selected {
    background-color: #dea9ff;
}

.file_name, .data, .size{
    margin: auto;
}
</style>