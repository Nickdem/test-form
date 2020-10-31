<template>
  <div class="helper">
    <p>Обязательные поля обозначены - *</p>
    <p>Проверьте все поля формы</p>
    <button @click="$emit('closed')">Закрыть</button>
  </div>
</template>

<style lang="sass">
$helper-indents: 40px

.helper
  position: fixed
  right: $helper-indents
  bottom: $helper-indents
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

    p 
      font-size: 28px

@media screen and (min-width: 1200px)
  .helper
    width: 500px
    padding: 3rem

    p 
      font-size: 36px

</style>