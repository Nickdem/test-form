<template>
  <main>
    <CreateClient @helper="helperShow" />
    <button class="helper-btn" @click="helperShow('Обязательные поля обозначены - *')">
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
$helper-indents: 40px

body 
  margin: 10px
  background: #f5f5f5
  color: #6a6a6a

.helper-btn
  position: fixed
  top: $helper-indents
  right: $helper-indents
  font-size: 24px
  width: 70px
  height: 70px
  border-radius: 50%
  background-color: #08acad
  color: #ffffff

@media screen and (min-width: 767px)
  body
     margin: 4rem
  
  .helper-btn
    top: auto
    bottom: $helper-indents
    
</style>
