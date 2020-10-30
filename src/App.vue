<template>
  <main>
    <CreateClient />
  </main>
</template>

<script>
import CreateClient from '@/components/CreateClient'
export default {
  name: 'App',
  components: {
    CreateClient
  }
}
</script>

<style lang="sass">
body 
  margin: 4rem
  background: #f5f5f5
  color: #6a6a6a

</style>
