<template>
  <main>
    <CreateClient @helper="showHelper = true" @completed="showCompleted = true" />
    <button class="helper-btn" @click="helperShow">
      ?
    </button>
    <Helper v-if="showHelper" @closed="helperShow" />
    <Completed v-if="showCompleted" @closed="showCompleted = false" />
  </main>
</template>

<script>
import CreateClient from '@/components/CreateClient'
import Helper from '@/components/Helper'
import Completed from '@/components/Completed'

export default {
  name: 'App',
  data: () => ({
    showHelper: false,
    showCompleted: false
  }),
  components: {
    CreateClient, Helper, Completed
  },
  methods: {
    helperShow () {
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
