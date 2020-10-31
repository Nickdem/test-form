<template>
  <div class="helper">
    <p>{{text}}</p>
    <button @click="$emit('closed')">Закрыть</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String
    }
  }
}
</script>

<style lang="sass">
$helper-indents: 40px

.helper
  position: fixed
  top: $helper-indents
  right: $helper-indents
  width: 200px
  padding: 1rem
  background-color: #ffffff
  text-align: center
  border: 2px solid #08acad

  p
    font-size: 24px

  button
    font-size: 24px
    background: none
    border: none
    color: #d73c42
    cursor: pointer

@media screen and (min-width: 767px)
  .helper
    width: 300px
    padding: 2rem
    top: auto
    bottom: $helper-indents

    p 
      font-size: 28px

@media screen and (min-width: 1200px)
  .helper
    width: 500px
    padding: 3rem

    p 
      font-size: 32px

</style>