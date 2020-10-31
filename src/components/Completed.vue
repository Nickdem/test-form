<template>
  <div class="completed">
    <p>Поздравляем, вы успешно зарегестрировались!</p>
    <button @click="$emit('closed')">Закрыть</button>
  </div>
</template>

<style lang="sass">
$completed-indents: 40px

.completed
  position: absolute
  bottom: $completed-indents
  right: $completed-indents
  width: 200px
  background-color: #ffffff
  color: #08acad
  text-align: center
  border: 2px solid #6a6a6a

  p
    font-size: 24px

  button
    font-size: 24px
    background: none
    border: none
    color: #d73c42
    cursor: pointer

@media screen and (min-width: 767px)
  .completed
    width: 300px
    padding: 2rem

    p 
      font-size: 28px

@media screen and (min-width: 1200px)
  .completed
    width: 500px
    padding: 3rem

    p 
      font-size: 36px

</style>