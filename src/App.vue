<template>
  <main>
    <CreateClient @helper="helperShow" />
    <button v-if="!showHelper" class="helper-btn" @click="helperShow('Обязательные поля обозначены - *')">
      ?
    </button>
    <Helper v-if="showHelper" :text="textHelper" @closed="helperShow" />
  </main>
</template>

<script>
import CreateClient from '@/components/CreateClient'
import Helper from '@/components/Helper'

export default {
  name: 'App',
  data: () => ({
    showHelper: false,
    textHelper: ''
  }),
  components: {
    CreateClient, Helper
  },
  methods: {
    helperShow (value) {   
      this.textHelper = value
      this.showHelper = !this.showHelper
    }
  }
}
</script>

<style lang="sass">
$mob-helper-indents: 10px
$main-helper-indents: 40px

body 
  margin: 10px
  background: #f5f5f5
  color: #6a6a6a

.helper-btn
  position: fixed
  top: $mob-helper-indents
  right: $mob-helper-indents
  font-size: 14px
  width: 40px
  height: 40px
  border-radius: 50%
  background-color: #08acad
  color: #ffffff

@media screen and (min-width: 767px)
  body
     margin: 4rem
  
  .helper-btn
    top: auto
    right: $main-helper-indents
    bottom: $main-helper-indents
    width: 70px
    height: 70px
    font-size: 24px
    
</style>
