<template>  
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    Ошибка!
                </div>

                <div class="modal-body">
                    <slot>
                        Текст ошибки
                    </slot>
                </div>

                <div class="modal-footer">
                    <button class="modal-default-button" @click="$emit('close')">
                        OK
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 30%;
  margin: 0px auto;
  padding: 2em 2em;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header{
  margin-top: 0;
  font-size: 1.5em;
  color: #6208c5;
}

.modal-body {
  margin: 2em 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>